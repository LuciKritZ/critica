/* eslint-disable no-unused-vars */
import { db } from './firebase';

const userRef = db.collection('users');
const bookRef = db.collection('books');
const userBookRef = db.collection('user_books');
const userCommentAndRatingRef = db.collection('user_comments_rating');
const userCommentRelationRef = db.collection('user_comment_relation');
const userRole = db.collection('role');
// all db oprations will be done here.
// create user
export const doCreateUser = (user) => userRef.add(user);

// create book
export const doCreateBook = (book) => bookRef.add(book);

// create user book
export const doCreateUserBook = (userBook) => userBookRef.add(userBook);

// create user comments and rating
export const doCreateUserComment = (userCommentaAndRating) =>
    userCommentAndRatingRef.add(userCommentaAndRating);

// create user comment relation
export const doCreateUserCommentRelation = (userCommentRelation) =>
    userCommentRelationRef.add(userCommentRelation);

// create user role
export const doCreateRole = (role) => userRole.add(role);

// get/read single user based on email
export const doGetUser = (email) => userRef.where('email', '==', email);

// get/read all user
export const doGetAllUsers = (_) => userRef;

// get/read book user and book id
export const doGetBookUsersByUserBookID = (userID, bookID) =>
    userBookRef.where('userID', '==', userID).where('bookID', '==', bookID);

// get/read book by author or title
export const doGetBook = (attribute) => bookRef.where(`${attribute}`, '==', attribute);

// get/read all books
export const doGetBooks = (_) => bookRef;

// get/read user book comment and rating
export const doGetUserCommentAndRating = (commentID) =>
    userCommentAndRatingRef.where('commentID', '==', commentID);

// get/read user book comment realtion
export const doGetUserCommentRelation = (userID, bookID) =>
    userCommentRelationRef.where('userID', '==', userID).where('bookID', '==', bookID);

// get/read user role
export const doGetUserRoles = (userID) => userRole.where('userID', '==', userID);

// delete user
export const doDeleteUser = (id) => userRef.doc(id).delete();

// delete book
export const doDeleteBook = (id) => bookRef.doc(id).delete();

// delete user book
export const doDeleteUserBook = (id) => userBookRef.doc(id).delete();

// delete comment and rating
export const doDeleteCommentAndRating = (id) => userCommentAndRatingRef.doc(id).delete();

// delete user comment relation
export const doDeleteUserCommentRelation = (id) => userCommentRelationRef.doc(id).delete();

// delete role
export const doDeleteRole = (id) => userRole.doc(id).delete();

// update operation will be below--------------------
