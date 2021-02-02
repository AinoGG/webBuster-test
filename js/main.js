


    window.addEventListener('DOMContentLoaded', () => {


    

function openModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';  
}    


function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

const inputProduct = document.querySelector('#product');

function modal(triggerSelector, modalSelector) {

    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);

          modalTrigger.forEach(item => {
            item.addEventListener('click', () => {
                let title = item.dataset.title;
                inputProduct.value = title;
            });
          });

        modal.addEventListener('click', event => {
            if(event.target === modal || event.target.getAttribute('data-close') == ''){
                closeModal(modalSelector);
            }
        });          

        document.addEventListener('keydown', e => {
            if(e.code === 'Escape' && modal.classList.contains('show')){
                closeModal(modalSelector);
            }
        });


        modalTrigger.forEach(item => {
            item.addEventListener('click', () => openModal(modalSelector));
            });      
            
}

//  async function postData(url, data)  {
//     const res = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-type': 'application/json'
//             },
//             body: data
//     });

//     return await res.json();
// };

async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}


    getResource('http://localhost:3000/product')
        .then(data => createCard(data));

    function createCard(data) {
        data.forEach(({img, name, price}) => {
            const element = document.createElement('div');

            element.classList.add("chairs__item");
            
            element.innerHTML = `                
                <img src=${img} alt="">
                <div class="chairs__item-title">
                    ${name}
                </div>
                <div class="chairs__item-price">${price}<span>&#8381;</span></div>
                <button class="btn-modal" data-title="${name}">Купить</button>     
            `;
            document.querySelector(".chairs .chairs__items").append(element);
                       
        });



        modal('.btn-modal', '.modal');   
    }

   
    // const forms = () => {
    //     const form = document.querySelectorAll('form'),
    //           inputs = document.querySelectorAll('input');


        // const message = {
        //     loading: 'Loading..',
        //     succes: 'Сообщение отправлено',
        //     failure: 'что-то пошло не так!'
        // };


    //     const postData = async (url, data) => {
    //         document.querySelector('.status').textContent = message.loading;
    //         let res = await fetch(url, {
    //             method: "POST",
    //             body: data
    //         });

    //         return await res.json();
    //     }


    //     const clearInputs = () => {
    //         inputs.forEach(item => {
    //             item.value = '';
    //         })
    //     }

    //     form.forEach(item => {
    //         item.addEventListener('submit', (e) =>{
    //             e.preventDefault();

                // let statusMessage = document.createElement('div');
                // statusMessage.classList.add('status');
                // item.appendChild(statusMessage);




    //             const formData = new FormData(item);
    //             postData('assets/mail.php', formData)
    //                 .then(res => {
    //                     console.log(res);
    //                     statusMessage.textContent = message.succes;
    //                 })
    //                 .catch(() => statusMessage.textContent = message.failure)
    //                 .finally(() => {
    //                     clearInputs();
    //                     setTimeout(() => {
    //                         statusMessage.remove();
    //                     }, 5000);
    //                 });
                    

    //         });
    //     });
    // }
      
    // forms();


    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Loading..',
        succes: 'Сообщение отправлено',
        failure: 'что-то пошло не так!'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                statusMessage.textContent = message.loading;

                form.append(statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'mail.php');

            // request.setRequestHeader('Content-type', 'multipart/form-data');
            const formData = new FormData(form);

            request.send(formData);

            request.addEventListener('load', () => {
                if(request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = message.succes;
                } else {
                    statusMessage.textContent = message.failure;
                }
            })
        });
    }

    });



