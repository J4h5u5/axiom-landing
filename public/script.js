const API_URL = 'https://space-dropsov.net/api/v1';

const enc = new TextEncoder();

fetch(`${API_URL}/usersCount`).then((res) => {
    res.json().then(({ data }) => {
        document.querySelector('#users-count').innerHTML = data.usersCount;
    });
});


function onTelegramAuth(user) {
    console.log(user);

    const userRefId = Base58.encode(enc.encode(user.id));
    console.log('userRefId', userRefId);
    fetch(`${API_URL}/users/${userRefId}`).then((res) => {
        res.json().then(({ data }) => {
            document.querySelector("#welcome").classList.add("hidden");
            document.querySelector("#cabinet").classList.remove("hidden");
            document.querySelector("#referral-link").innerHTML = `твоя реферральная ссылка: ${location.origin}/?ref=${userRefId}`;
            console.log('/users/:id', data);
            const userName = user.username || `${user.first_name} ${user.last_name}`;
            if (!data.user) {
                const body = JSON.stringify({
                    "referralId": userRefId,
                    "userName": userName
                });
                console.log(body);
                fetch(
                    `${API_URL}/users`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                          },
                        body
                    })
                    .then((createRes) => {
                        console.log('post /users', createRes);
                        const searchParams = new URLSearchParams(location.search);
                        const refId = searchParams.get("ref");
                        console.log(refId);
                        if (refId) {
                            fetch(
                                `${API_URL}/users/${refId}`,
                                {
                                    method: "PATCH",
                                    headers: {
                                        "Content-Type": "application/json",
                                      },
                                    body: JSON.stringify({
                                        "referralId": userRefId,
                                        "userName": userName
                                    })
                                })
                                .then((res) => {

                                });
                        }

                    });
            } else {
                console.log(data.user);
                data.user.referrals.forEach(ref => {
                    if (!ref.userName) {
                        return;
                    }
                    const li = document.createElement("li");
                    const text = document.createTextNode(ref.userName);
                    li.appendChild(text);
                    const parent = document.getElementById("referrals");
                    parent.appendChild(li);
                });
            }
        });
    });
}
