const logger = require('../../../modules/logger')
const DormQuestion = require('./dormquestions.model')
const DormRating = require('../dormratings/dormratings.model')
const Dorm = require('../dorms.model')

/**
 * Get all the questions that match the provided parameters (search or by dorm ID)
 * @param ctx {Koa context} ctx.query.dorm and ctx.query.search are used, if provided. If ctx.query.dorm is
 *   provided, it will only show questions that belong to that dorm ID. Otherwise it will show only general questions.
 *   If ctx.query.search is provided, it will only show questions that contain the search value.
 * @returns {Promise<void>}
 */
async function getQuestions (ctx) {
  const queryObj = { hasBeenEdited: false }
  if (ctx.query.dorm) {
    queryObj._dorm = ctx.query.dorm
  } else {
    queryObj._dorm = null
  }

  if (ctx.query.search) {
    queryObj.body = new RegExp('.*' + ctx.query.search + '.*', 'i')
  }

  const questions = await DormQuestion.find(queryObj)

  ctx.ok({ questions })
}

/**
 * Post a new question.
 * @param ctx {Koa context} body parameters "title", "dorm", and "isAnonymous" are used. "title" is required. "title"
 *  must be 5 characters or longer.
 *  "title" is the title of the question. "isAnonymous" is a boolean for whether the author wants their name to be shown
 *  next to the question. Defaults to true. "dorm" is the ID of the dorm this question pertains to. Defaults to "null",
 *  i.e. this is a general question.
 * @returns {Promise<void>}
 */
async function postQuestion (ctx) {
  if (!ctx.request.body.title || ctx.request.body.title.length < 5) {
    return ctx.badRequest('Please provide a longer question title')
  }
  // If a dorm is provided then make sure it exists
  if (ctx.request.body.dorm) {
    const d = await Dorm.findOne({ _id: ctx.request.body.dorm })
    if (!d) {
      return ctx.notFound('The dorm provided does not exist!')
    }
  }
  const question = new DormQuestion()
  question.isAnonymous = !!ctx.request.body.isAnonymous
  question.body = ctx.request.body.title
  question._dorm = ctx.request.body.dorm

  await question.save()
  ctx.created()
}

async function editQuestion (ctx) {
  if (ctx.request.body.title && ctx.request.body.title.length < 5) {
    return ctx.badRequest('Please provide a longer question title')
  }

  const searchObj = { _id: ctx.params.id }
  if (!ctx.state.user.admin) { // Users can only edit their own questions unless they're admin
    searchObj._author = ctx.state.user._id
  }
  const original = await DormQuestion.findOne(searchObj)
  if (original == null) {
    return ctx.notFound()
  }
  if (original.hasBeenEdited) { // Cannot delete message if it is an outdated version of another message
    return ctx.send(409, { message: 'This message has been edited and this object is no longer available.' })
  }

  const newMessage = new DormQuestion()
  newMessage.body = ctx.request.body.title === undefined ? original.body : ctx.request.body.title
  newMessage.isAnonymous = ctx.request.body.isAnonymous === undefined
    ? original.isAnonymous : !!ctx.request.body.isAnonymous
  newMessage._dorm = original._dorm
  newMessage._previousEdits = original._previousEdits // Copy list of old edits & add the original to it
  newMessage._previousEdits.push(original)
  newMessage._author = original._author
  original.hasBeenEdited = true
  original.save()
  newMessage.save()

  ctx.created()
}

async function deleteQuestion (ctx) {
  const searchObj = { _id: ctx.params.id }
  if (!ctx.state.user.admin) { // Users can only delete their own questions unless they're admin
    searchObj._author = ctx.state.user._id
  }
  const dq = await DormQuestion.findOne(searchObj)
  if (dq == null) {
    return ctx.notFound()
  }
  if (dq.hasBeenEdited) { // Cannot delete message if it is an outdated version of another message
    return ctx.send(409, { message: 'This message has been edited and this object is no longer available.' })
  }

  if (dq._previousEdits) { // Delete all previous versions of this question
    for (const prev of dq._previousEdits) {
      await DormQuestion.deleteOne({ _id: prev._id })
    }
  }

  await DormQuestion.deleteOne({ _id: dq._id })
  ctx.noContent()
}

async function voteOnQuestion (ctx) {
  const dq = await DormQuestion.findOne({ _id: ctx.params.id })
  if (dq == null) {
    return ctx.notFound()
  }
  let rating

  rating = await DormRating.findOne({
    _isFor: ctx.params.id,
    isForType: 'DormQuestion',
    _from: ctx.state.user._id
  })

  if (rating == null) {
    rating = new DormRating()
  }

  rating._from = ctx.state.user._id
  rating._isFor = dq
  rating.isForType = 'DormQuestion'
  rating.value = ctx.request.body.value === 'POSITIVE' ? 1 : -1
  rating.save()
  ctx.noContent()
}

module.exports = {
  getQuestions,
  postQuestion,
  editQuestion,
  deleteQuestion,
  voteOnQuestion
}