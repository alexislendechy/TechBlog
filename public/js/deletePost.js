const delButton = document.querySelector("#del-post-btn");
const postId = document.querySelector('input[name="post-id]').value;

const deleteHandler = async () => {
  const response = await fetch(`/api/post/${postId}`, {
    method: "DELETE",
  });
  console.log(comment);

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(statusText);
  }
};

if (delButton != null) {
  delButton.addEventListener("click", deleteHandler);
}
