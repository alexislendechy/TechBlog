// Sample JavaScript code for client-side interactions
document.addEventListener('DOMContentLoaded', () => {
    // Check if the user is on the homepage
    if (window.location.pathname === '/') {
      // Add an event listener to the "Create Post" button
      const createPostButton = document.getElementById('createPostButton');
      if (createPostButton) {
        createPostButton.addEventListener('click', () => {
          // Redirect to the create post page
          window.location.href = '/user/dashboard';
        });
      }
  
      // Add an event listener to the "View Post" links
      const viewPostLinks = document.querySelectorAll('.view-post-link');
      if (viewPostLinks) {
        viewPostLinks.forEach((link) => {
          link.addEventListener('click', (event) => {
            // Prevent the default link behavior
            event.preventDefault();
            // Extract the post ID from the link's href
            const postID = link.getAttribute('href').split('/').pop();
            // Redirect to the individual blog post page
            window.location.href = `/blog/post/${postID}`;
          });
        });
      }
    }
  
    // Add more client-side interactions as needed for your project
  });
  