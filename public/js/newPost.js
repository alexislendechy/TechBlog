const newpostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('textarea[name="post-content"]').value;

    const response = await fecth('/api/post', {
        method: 'POST',
        body: JSON.stringify({
            postId: id, 
            title,
            content,
        }),
        headers: {'Content-Type': 'application/json'},
    });
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert("Something wrong!");
    }
}



document.querySelector('#newpost-form').addEventListener('submit', newpostFormHandler);