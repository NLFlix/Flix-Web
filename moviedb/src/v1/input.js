import $ from 'jquery';

$(".mat-input").focus(function(){
    $(this).parent().addClass("is-active is-completed");
    console.log("IS COMPLETE AND ACTIVE")
  });
  
$(".mat-input").focusout(function(){
  if($(this).val() === "")
    $(this).parent().removeClass("is-completed");
    console.log("IS COMPLETE")
  $(this).parent().removeClass("is-active");
  console.log("IS ACTIVE")
});