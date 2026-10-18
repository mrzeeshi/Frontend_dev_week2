const form = $("#contact-form");
const spec = {
  name: rules.required("Enter your name."),
  email: rules.email,
  subject: rules.required("Choose a subject."),
  message: rules.minLen(10, "Write a message.")
};
liveClear(form, spec);
form.addEventListener("submit", e => {
  e.preventDefault();
  if (!validateForm(form, spec)) return;
  const first = form.elements.name.value.trim().split(" ")[0];
  form.reset();
  const ok = $("#contact-ok");
  ok.textContent = `Thanks, ${first}. Your message was received. This is a demo form, so nothing was actually sent.`;
  ok.hidden = false; ok.focus();
});
