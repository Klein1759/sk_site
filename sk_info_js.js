// Any code here cannot be used without my permission  

function body_toggle(toggle_class) {
  $(toggle_class).toggle();
}

$(".skills_title").click(function() {
   var skills_body = ".skills_body"
   body_toggle(skills_body);
});

$(".experience_title").click(function() {
   var exp_body = ".experience_body"
   body_toggle(exp_body);
});

$(".education_title").click(function() {
   var edu_body = ".education_body"
   body_toggle(edu_body);
});