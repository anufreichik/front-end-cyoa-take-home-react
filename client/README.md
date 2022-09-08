# Client part for Comments App Summary

Application allows for user to create/delete all and view comments.

Initially when no comments exist, user presented with the form to create new comment that takes whole width of screen in both desktop and small glass device.

If any comments already created, user will be presented with comments list on left side and form for creation of new comments on right side for desktop, for small glass devices form will be always above comments list.

Each comment card have info with comment data and details link, to reroute user to comment details page.

User has ability to delete all comments, if any created, using icon button that will be present on top right side. Confirm message will appear to allow user to confirm or cancel action.

If another user create new comment, all other users will be notified through alert window, in addition they will see count on badge icon will increase, indicating number of new comments. User can click on badge icon to load new comments.


## App architecture

### Routes
Application has main layout route that has sub-routes for Home and Details pages. Home route is index(default) route.

### Components
Layout component has 3 sections Header, Main, Footer. Main section will have outlet(react-router-dom), where all child components will be placed.

Home component has CommentsList and CommentForm as children components, as well all callbacks implementation.

CommentsList component has Comment component as child component.

CommentDetails component is route that is linked from comment component.

### Socket.io

Real time notification implemented using Socket.io library.

Server socket set on initial component load in useEffect of Home component.

CreateComment method will send(emit) notification to server(named as sendNotificationOnCreateComment) on successfully comment created result, where server is listening for this notification and on received will broadcast event to all users(getNotification). Home component has accordingly listener for getNotification, where on triggering will set alert box appear and add value for commentId to state variable.






