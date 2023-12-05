function registerUser() {
  const form = document.getElementById("registerform");
    form.addEventListener("submit",  (event) => {
      // stop form submission
      event.preventDefault();
     // console.log("here I am ")
      const data = new FormData(event.target);
      const dataObject = Object.fromEntries(data.entries());
      console.log(dataObject);
})}