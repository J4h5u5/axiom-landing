const API_URL = 'https://space-dropsov.net/api/v1';

// eslint-disable-next-line node/no-unsupported-features/node-builtins
const enc = new TextEncoder();

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const createUser = (userRefId, userName) => {
    const body = JSON.stringify({
        referralId: userRefId,
        userName: userName,
    });

    fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body,
    }).then((createRes) => {
        console.log('post /users', createRes);
        const searchParams = new URLSearchParams(location.search);
        const refId = searchParams.get('ref');
        console.log(refId);
        if (refId) {
            fetch(`${API_URL}/users/${refId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    referralId: userRefId,
                    userName: userName,
                }),
            }).then((res) => {});
        }
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
        $('.cosmos').addClass('normal');
    }

    const hideWelcome = () => {
        $(".welcome").fadeOut();
    }


    fetch(`${API_URL}/usersCount`).then((res) => {
        res.json().then(({ data }) => {
            document.querySelector('#users-count').innerHTML = data.usersCount;
        });
    });

    window.onTelegramAuth = (user) => {
        console.log(user);

        const userRefId = Base58.encode(enc.encode(user.id));
        hideForm();
        showCountdown();

        fetch(`${API_URL}/users/${userRefId}`).then((res) => {
            res.json().then(({ data }) => {
                delay(7000).then(() => {
                    hideCountdown();
                    delay(1000).then(() => {
                        showCosmos();
                        delay(1500).then(() => {
                            hideWelcome();
                            // Здесь отображение кабинета
                            // document.querySelector(
                            //     '#referral-link'
                            // ).innerHTML = `твоя реферральная ссылка: ${location.origin}/?ref=${userRefId}`;
                            console.log('/users/:id', data);
                            const userName = user.username || `${user.first_name} ${user.last_name}`;
                            if (!data.user) {
                                createUser(userRefId, userName);
                            } else {
                                // console.log(data.user);
                                // data.user.referrals.forEach((ref) => {
                                //     if (!ref.userName) {
                                //         return;
                                //     }
                                //     const li = document.createElement('li');
                                //     const text = document.createTextNode(ref.userName);
                                //     li.appendChild(text);
                                //     const parent = document.getElementById('referrals');
                                //     parent.appendChild(li);
                                // });
                            }
                        })
                    })

                });
            });
        });
    }

})(jQuery);