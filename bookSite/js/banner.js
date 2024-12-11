
//slide
$(".buttonsMenu").hide().fadeIn(2000);
$("#title").hide().fadeIn(2000);
$(".quote-container").hide().fadeIn(2000);

// scroll to contacts
$(document).ready(function () {
    $('#info, #contacts').click(function () {
        $('html, body').animate({
            scrollTop: $(document).height()
        }, 'slow'); 
    });
});

// scroll to books
$(document).ready(function () {
    $('#toBooks').click(function () {
        $('html, body').animate({
            scrollTop: $('.book-card').offset().top
        }, 'slow'); 
    });
});

//scroll to up
$(document).ready(function () {
    $('#up').click(function () {
        $('html, body').animate({
            scrollTop: 0 
        }, 'slow'); 
    });
});

//filter by genre
$('input[type="radio"]').click(function () {
    let selectedFilter = $(this).val();

    if (selectedFilter === 'all') {
        $('.book-card').show();
    } else {
        $('.book-card').hide();
        $('.book-card[data-category~="' + selectedFilter + '"]').show();
    }
});


$("#filtersSubmit").click(function () {
    // price
    let $leftPrInp = parseInt($("#inputPrLeft").val(), 10);
    let $rigthPrInp = parseInt($("#inputPrRight").val(), 10);

    // year
    let $leftYearInp = parseInt($("#inputYearLeft").val(), 10);
    let $rigthYearInp = parseInt($("#inputYearRight").val(), 10);

    $('.book-card').each(function () {
        
        var $price = parseInt($(this).data("price"), 10);
        var $year = parseInt($(this).data("year"), 10);
        if (
            ($price >= $leftPrInp && $price <= $rigthPrInp) &&
            ($year >= $leftYearInp && $year <= $rigthYearInp) &&
            $(this).is(":visible") 
        ) { $(this).show(); } else { $(this).hide(); }
    });
});

$('#filtersReset').click(function (e) {
    $('#inputPrLeft').val(300);
    $('#inputPrRight').val(550);
    $('#inputYearLeft').val(1865);
    $('#inputYearRight').val(2019);
    $('#all').prop("checked", true);
    $('.book-card').show();
    e.preventDefault();
});

$("#map").click(function () {
    window.location.href = "https://yandex.ru/maps/org/moskovskiy_dom_knigi/1023941156/?ll=37.597573%2C55.752822&z=16.84";
});

// search
$('#btn_search_book').click(function () {
    $input = $('#input_search_book').val();
    if ($input !== '' || $input !== undefind) {
        $('.book-card').each(function () {
            let $name = $(this).data("name");
            let $nameStr = $name.toString()
            if ($nameStr === $input && $(this).is(":hidden")) {
                let $genre = $(this).data("category");
                let selectedRadio = $('input[name="filter"]:checked');
                let selectedValue = selectedRadio.val();
                if (selectedValue == 'all') {
                    $(this).show();
                }
                else if (selectedValue === $genre) {
                    $('.book-card[data-category~="' + $genre + '"]').show();
                }
            } else if ($nameStr === $input && $(this).is(":visible")) {
                $(this).show();          
            } else {
                $(this).hide();
            }
        });
    }
});

// clear
$('#btn_search_book_clear').click(function (e) {
    $('#input_search_book').val('');
    $('#inputPrLeft').val(300);
    $('#inputPrRight').val(550);
    $('#inputYearLeft').val(1865);
    $('#inputYearRight').val(2019);
    $('#all').prop("checked", true);
    $('.book-card').show();
    e.preventDefault();
});

//users
let userss = [];

userss.push({
    login: "John", 
    password: "Snow"
});
userss.push({
    login: "Jane",
    password: "Doe"
});

const usersJSON = JSON.stringify(userss);
localStorage.setItem('userss', usersJSON);
console.log(localStorage.getItem('userss'));

// open form
$('#enter').click(function(){
    $('#auth-modal-enter').fadeIn(400);
})

$('#auth-modal-enter, #auth-modal-registracia').on('click', function(event) {
    var formId = $(this).find('form').attr('id');
    if (!$(event.target).closest('#' + formId).length) {
        $(this).hide();
        if (formId === 'auth-form-enter') {
            $('#faultEnter').text(''); 
            $('#login, #password, #faultEnter').val('');
        } else {
            $('#faultReg').text('');
            $('#login-reg, #password-reg, #password-reg-conf').val('');
        }
    }
});

//entrance
let users = JSON.parse(localStorage.getItem('users'));
$('#vhod').click(function() {
    let $login = $('#login').val();
    let $password = $('#password').val();

    if ($login === '' || $password === '') {
      $('#faultEnter').text("Заполните логин и пароль").css({
        "color": "red"
      });
    } else {
        let userFound = false;
        for (const user of users) {
            if (user.login === $login && user.password === $password) {
            $('#auth-modal-enter').fadeOut(700);
            userFound = true;
            $('#enterLi').text('Профиль');
            $('#enter').addClass('disabled'); 
            $('#enter').off('click');
            break;
            }
        }
        if (!userFound) {     
            $('#faultEnter').text("Неверный логин или пароль").css({
                "color": "red"
            });
        }
    }
});
//registration
$('#registracia').click(function(){
    $('#auth-modal-enter').fadeOut(400);
    $('#faultReg').text("");
    $('#auth-modal-registracia').fadeIn(400);
   
})
  // Обработчик регистрации
$('#registraciaConfirm').click(function() {
    let $loginReg = $('#login-reg').val();
    let $passwordReg = $('#password-reg').val();
    let $passwordRegConf = $('#password-reg-conf').val();

    if ($loginReg === '' || $passwordReg === '' || $passwordRegConf === '') {
        $('#faultReg').text("Заполните логин и пароль").css({
        "color": "red"
        });
    } else if ($passwordReg !== $passwordRegConf) {
        $('#faultReg').text("Пароли не совпадают").css({
        "color": "red"
        });
    } else {
        let userExists = false;
        for (const user of users) {
        if (user.login === $loginReg) {
            userExists = true;
            $('#faultReg').text('Такой пользователь уже существует').css({
                "color": "red"
            });
            break;
        }
        }

        if (!userExists) {
            users.push({
                login: $loginReg,
                password: $passwordReg
            });
        localStorage.setItem('users', JSON.stringify(users));
        console.log("Новый пользователь добавлен:", users);
        $('#login, #password').val('');
        $('#faultReg, #faultEnter').text("");
        ///////////////////////////////
        // Переключаем на модальное окно входа
        $('#auth-modal-registracia').fadeOut(400);
        $('#auth-modal-enter').fadeIn(400);
        }
    }
});

  // Сброс ошибок
$('#reset').click(function() {
    $('#faultReg, #faultEnter').text("");
});






