"use strict";

/************************** CONSTANTS *****************************/

/**
 * @type {NodeListOf<HTMLButtonElement>}
 */
const deleteBtns = document.querySelectorAll('.delete');

/************************** EVENT LISTENERS *****************************/

for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener('click', () => {
        const id = deleteBtns[i].getAttribute('data-id');

        deleteUser(parseInt(id));
    });
}

/************************** FETCH API *****************************/

/**
 * Using fetch API to delete an user
 * @param {number} id id of the user to delete
 */
function deleteUser(id) {
    fetch(`/users/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.status === 200) {
            window.location.href = '/users';
        }
    })
        .catch(err => console.log(err));
}