$(document).ready(function(){
  //initialize the firebase app
  var config = {
    apiKey: "AIzaSyD4xXAiVos5kvG4j79m3UnERnnWDFN2RfA",
    authDomain: "kisan-marketplace.firebaseapp.com",
    databaseURL: "https://kisan-marketplace.firebaseio.com",
    projectId: "kisan-marketplace",
    storageBucket: "kisan-marketplace.appspot.com",
    messagingSenderId: "48078251919",
    appId: "1:48078251919:web:1313cf3bef6f7236230dfa",
    measurementId: "G-0JY1R5JT0R"
  };
  firebase.initializeApp(config);

  //create firebase referencesT
  var Auth = firebase.auth(); 
  var dbRef = firebase.database();
  var productsRef = dbRef.ref('products')
  var usersRef = dbRef.ref('users')
  var auth = null;

  //Register
  $('#registerForm').on('submit', function (e) {
    e.preventDefault();
    $('#registerModal').modal('hide');
    $('#messageModalLabel').html(spanText('<i class="fa fa-cog fa-spin"></i>', ['center', 'info']));
    $('#messageModal').modal('show');
    var data = {
      email: $('#registerEmail').val(), //get the email from Form
      firstName: $('#registerFirstName').val(), // get firstName
      lastName: $('#registerLastName').val(), // get lastName
    };
    var passwords = {
      password : $('#registerPassword').val(), //get the pass from Form
      cPassword : $('#registerConfirmPassword').val(), //get the confirmPass from Form
    }
    if( data.email != '' && passwords.password != ''  && passwords.cPassword != '' ){
      if( passwords.password == passwords.cPassword ){
        //create the user
        
        firebase.auth()
          .createUserWithEmailAndPassword(data.email, passwords.password)
          .then(function(user) {
            return user.updateProfile({
              displayName: data.firstName + ' ' + data.lastName
            })
          })
          .then(function(user){
            //now user is needed to be logged in to save data
            auth = user;
            //now saving the data
            usersRef.child(user.uid).set(data)
              .then(function(){
                console.log("User Information Saved:", user.uid);
              })
            $('#messageModalLabel').html(spanText('Success!', ['center', 'success']))
            
            $('#messageModal').modal('hide');
          })
          .catch(function(error){
            console.log("Error creating user:", error);
            $('#messageModalLabel').html(spanText('ERROR: '+error.code, ['danger']))
          });
      } else {
        //password and confirm password didn't match
        $('#messageModalLabel').html(spanText("ERROR: Passwords didn't match", ['danger']))
      }
    }  
  });

  //Login
  $('#loginForm').on('submit', function (e) {
    e.preventDefault();
    $('#loginModal').modal('hide');
    $('#messageModalLabel').html(spanText('<i class="fa fa-cog fa-spin"></i>', ['center', 'info']));
    $('#messageModal').modal('show');

    if( $('#loginEmail').val() != '' && $('#loginPassword').val() != '' ){
      //login the user
      var data = {
        email: $('#loginEmail').val(),
        password: $('#loginPassword').val()
      };
      firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(function(authData) {
          auth = authData;
          $('#messageModalLabel').html(spanText('Success!', ['center', 'success']))
          $('#messageModal').modal('hide');
        })
        .catch(function(error) {
          console.log("Verification Failed!", error);
          $('#messageModalLabel').html(spanText('Verification Failed!!!', ['danger']))
        });
    }
  });

  $('#logout').on('click', function(e) {
    e.preventDefault();
    firebase.auth().signOut();
    window.location.reload();
  });

  //save product
  $('#productForm').on('submit', function( event ) {  
    event.preventDefault();
    if( auth != null ){
      if( $('#name').val() != '' || $('#email').val() != '' ){
        productsRef.child(auth.uid)
          .push({
            name: $('#name').val(),
            quantity: $('#quantity').val(),
            price: $('#price').val(),
            phone: $('#phone').val(),
            description: $('#description').val(),
            location: {
              address: $('#address').val(),

            }
          })
          document.productForm.reset();
      } else {
        alert('Please fill at-lease name or email!');
      }
    } else {
      //inform user to login
    }
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      auth = user;
      $('body').removeClass('auth-false').addClass('auth-true');
      usersRef.child(user.uid).once('value').then(function (data) {
        var info = data.val();
        if(user.photoUrl) {
          $('.user-info img').show();
          $('.user-info img').attr('src', user.photoUrl);
          $('.user-info .user-name').hide();
        } else if(user.displayName) {
          $('.user-info img').hide();
          $('.user-info').append('<span class="user-name">'+user.displayName+'</span>');
        } else if(info.firstName) {
          $('.user-info img').hide();
          $('.user-info').append('<span class="user-name">'+info.firstName+'</span>');
        }
      });
      productsRef.child(user.uid).on('child_added', onChildAdd);
    } else {
      // No user is signed in.
      $('body').removeClass('auth-true').addClass('auth-false');
      auth && productsRef.child().off('child_added', onChildAdd);
      $('#products').html('');
      auth = null;
    }
  });
});

function onChildAdd (snap) {
  $('#products').append(productHtmlFromObject(snap.key, snap.val()));
}
 
//prepare product object's HTML
function productHtmlFromObject(key, product){
  return '<div class="card product" style="width: 18rem;" id="'+key+'">'
    + '<div class="card-body">'
      + '<h5 class="card-title">'+ "Product: " + product.name+'</h5>'
      + '<h6 class="card-subtitle mb-2 text-muted">'+ "Mobile No: " + "+91 " + product.phone+'</h6>'
      + '<h6 class="card-subtitle mb-2 text-muted">'+ "Quantity: " + product.quantity+'kgs'+'</h6>'
      + '<h6 class="card-subtitle mb-2 text-muted">'+ "Price: " + '₹' + (product.price * product.quantity) + '.00'+'</h6>'
      + '<h6 class="card-subtitle mb-2 text-muted">'+ "Address: " + product.location.address+'</h6>'
      + '<h6 class="card-subtitle mb-2 text-muted">'+ "Description: " +  product.description + '</h6>'
      + '<button type="button" class="btn btn-primary" onclick="cart()">Add to Cart</button>'
      + '</p>'
    + '</div>'
  + '</div>';
}

function cart() {
  const toast=swal.mixin({
    toast:true,
    position:'middle',
    showConfirmButton:false,
    timer:1000
  });
  toast({
    type:'success',
    title: 'Added to shopping cart'
  });
}

function spanText(textStr, textClasses) {
  var classNames = textClasses.map(c => 'text-'+c).join(' ');
  return '<span class="'+classNames+'">'+ textStr + '</span>';
}
