const API_URL = `${location.origin}/api/v1`;

// eslint-disable-next-line node/no-unsupported-features/node-builtins
// const enc = new TextEncoder();

let authToken;

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const loginUser = (userData) => {

    return fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userData }),
    }).then(async (createRes) => {
        console.log('post /users', createRes);

        const responseData = await createRes.json();
        authToken = responseData.token;
        console.log(authToken);
        const searchParams = new URLSearchParams(location.search);
        const refId = searchParams.get('ref');
        console.log(refId);
        if (refId) {
            const userName = userData.username || `${userData.first_name} ${userData.last_name}`;
            fetch(`${API_URL}/users/${refId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: userData.id,
                    userName
                }),
            });
        }

        return createRes;
    });
};

(function () {
    const countDown = (timeleft) => {
        let _timeleft = timeleft;
        const timer = setInterval(function(){
            _timeleft--;
            $(".countdown").text(_timeleft);
            if(_timeleft <= 0) {
                clearInterval(timer);
            }
        },1000);
    }

    const hideForm = () => {
        $(".form").css({ display: 'none' });
    }

    const showCountdown = () => {
        $(".countdown").removeClass("hidden");
        countDown(7);
    }

    const hideCountdown = () => {
        $(".countdown").fadeOut();
    }

    const showCosmos = () => {
        $('.cosmos').removeClass('micro');
    }

    const hideWelcome = () => {
        $(".welcome").fadeOut();
    }

    const hideWrapper = async() => {
        $(".wrapper").addClass("wrapper-hidden");
        await delay(300);
        $(".wrapper").addClass("removed");
    }

    const showWrapperSecond = async() => {
        $(".wrapper-second").removeClass("removed");
        await delay(100);
        $(".wrapper-second").removeClass("wrapper-second-hidden");
    }

    fetch(`${API_URL}/usersCount`).then((res) => {
        res.json().then(({ data }) => {
            document.querySelector('#users-count').innerHTML = data.usersCount;
        });
    });

    window.onTelegramAuth = (userData) => {
        console.log(userData);

        hideForm();
        showCountdown();

        loginUser(userData).then((res) => {
            delay(7000).then(() => {
                hideCountdown();
                delay(1000).then(() => {
                    showCosmos();
                    delay(1100).then(() => {
                        hideWelcome();
                        res.json().then((data) => {
                            console.log('%c data', 'background: #222; color: #bada55', data);
                        });
                        // Здесь отображение кабинета
                        // document.querySelector(
                        //     '#referral-link'
                        // ).innerHTML = `твоя реферральная ссылка: ${location.origin}/?ref=${userRefId}`;
                    })
                    delay(2000).then(() => {
                        hideWrapper().then(() => {
                            showWrapperSecond();
                        })
                    })
                })

            });
        });
    }

})(jQuery);

