import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsynch'
import sendResponse from '../../utils/sendResponse'
import { SocialServices } from './social.service'

// Add rating to a recipe
const addRating = catchAsync(async (req, res) => {
  const { id } = req.user as any
  const { rating } = req.body
  const { recipeId } = req.params

  const result = await SocialServices.addRating(id, recipeId, rating) // Call service to add rating

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rating added successfully',
    data: result, // Send back the updated recipe with virtual fields
  })
})

// Add comment to a recipe
const addComment = catchAsync(async (req, res) => {
  const { id } = req.user as any // Get the user ID from the authenticated request
  const { content } = req.body // Get the comment text from the request body
  const { recipeId } = req.params // Get the recipe ID from the URL params

  const result = await SocialServices.addComment(id, recipeId, content) // Call service to add comment

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment added successfully',
    data: result, // Send back the updated recipe with comments
  })
})

// Update comment on a recipe
const updateComment = catchAsync(async (req, res) => {
  const { id } = req.user as any // User ID from authenticated request
  const { content } = req.body // New content for the comment
  const { recipeId, commentId } = req.params // Recipe ID and Comment ID (_id) from URL params

  const result = await SocialServices.updateComment(
    id,
    recipeId,
    commentId,
    content,
  ) // Call service to update comment

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment updated successfully',
    data: result, // Send back the updated recipe
  })
})

// Delete comment on a recipe
const deleteComment = catchAsync(async (req, res) => {
  const { id } = req.user as any // User ID from authenticated request
  const { recipeId, commentId } = req.params // Recipe ID and Comment ID (_id) from URL params

  const result = await SocialServices.deleteComment(id, recipeId, commentId) // Call service to delete comment

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment deleted successfully',
    data: result, // Send back the updated recipe
  })
})

// Upvote or downvote a recipe
const vote = catchAsync(async (req, res) => {
  const { vote } = req.body // 1 for upvote, -1 for downvote
  const { recipeId } = req.params
  const { id: userId } = req.user as any // User ID from authentication

  const updatedRecipe = await SocialServices.voteRecipe(userId, recipeId, vote)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Vote submitted successfully',
    data: updatedRecipe,
  })
})

export const SocialController = {
  addRating,
  addComment,
  updateComment,
  deleteComment,
  vote,
}
