import { db, collection, doc, addDoc, getDocs, deleteDoc, setDoc, query, orderBy } from '../db.js'

const nameInput = document.getElementsByClassName('user-input')[0];
const commentInput = document.getElementsByClassName('user-input')[1];
const addBtn = document.getElementById('addBtn');
const book = document.querySelector('ul')
const comments = new Map();

document.addEventListener('DOMContentLoaded', async () => {
    await readComments();
    addBtn.addEventListener('click', saveComment);
    commentInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            saveComment();
        }
    });
    nameInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            saveComment();
        }
    });
    book.addEventListener('click', handleBtnClickInPageHeader);
    // createBookPage({ name: '정청', comment: '어이 브라더' });
});

async function handleBtnClickInPageHeader(e) {
    const target = e.target;
    const name = target.dataset.name;
    const li = target.closest('li');
    const commentId = li.dataset.id;
    const comment = li.querySelector('textarea[data-name=comment]')

    if (target.nodeName === 'BUTTON') {
        if (name === 'delete') {
            await deleteDoc(doc(db, 'visitors', li.dataset.id));
            li.remove();
            comments.delete(commentId);
            return;
        } else if (name === 'update') {
            comment.readOnly = false;
        } else if (name === 'save') {
            const commentObj = comments.get(commentId);
            if (comment.value !== commentObj.comment) {
                commentObj.comment = comment.value;
                await setDoc(doc(db, 'visitors', commentId), commentObj);
            }
            comment.readOnly = true;
        } else if (name === 'cancel') {
            comment.readOnly = true;
            comment.value = comments.get(commentId).comment;
        }
        toggleAllBtn(li);
    }
}

function toggleAllBtn(li) {
    const buttons = [
        li.querySelector('button[data-name=update]'),
        li.querySelector('button[data-name=delete]'),
        li.querySelector('button[data-name=save]'),
        li.querySelector('button[data-name=cancel]'),
    ]
    buttons.forEach((btn) => $(btn).toggle());
}

async function readComments() {
    const visitors = collection(db, "visitors")
    const docs = await getDocs(query(visitors, orderBy("created", "desc")));
    docs.forEach((doc) => {
        const page = createBookPage({ ...doc.data(), docId: doc.id });
        document.querySelector('ul').appendChild(page);
        comments.set(doc.id, doc.data());
    });
}

async function saveComment() {
    const data = {
        name: nameInput.value,
        comment: commentInput.value,
        created: new Date().getTime()
    }
    if (!data.name || !data.comment) {
        alert('이름과 댓글을 모두 입력하세요!');
        return;
    }
    const afterDoc = await addDoc(collection(db, 'visitors'), data);
    const page = createBookPage({ ...data, docId: afterDoc.id });
    document.querySelector('ul').prepend(page);
    comments.set(afterDoc.id, data);
}

function createBookPage({ name, comment, created, docId }) {
    const page = document.createElement('li');
    page.classList.add('book__page');
    page.setAttribute('data-id', docId)
    page.appendChild(createPageHeader({ name, created }));
    page.appendChild(createPageContent({ comment }));
    return page;
}

function createPageHeader({ name, created }) {
    const pageHeader = document.createElement('div');
    pageHeader.classList.add('page-header');

    const pageHeaderName = document.createElement('div');
    pageHeaderName.classList.add('page-header__name');
    pageHeaderName.textContent = name;

    const pageHeaderDate = document.createElement('div');
    pageHeaderDate.classList.add('page-header__date');
    pageHeaderDate.textContent = `( ${yymmddhhmm(created)} )`;

    const updateButton = document.createElement('button');
    updateButton.classList += 'btn btn_primary page-header__update';
    updateButton.setAttribute('data-name', 'update');
    updateButton.textContent = '수정';

    const deleteButton = document.createElement('button');
    deleteButton.classList += 'btn btn_delete page-header__delete';
    deleteButton.setAttribute('data-name', 'delete');
    deleteButton.textContent = '삭제';

    const saveButton = document.createElement('button');
    saveButton.classList += 'btn btn_success btn_hide page-header__update';
    saveButton.setAttribute('data-name', 'save');
    saveButton.textContent = '저장';

    const cancelButton = document.createElement('button');
    cancelButton.classList += 'btn btn_delete btn_hide page-header__delete';
    cancelButton.setAttribute('data-name', 'cancel');
    cancelButton.textContent = '취소';

    pageHeader.appendChild(pageHeaderName);
    pageHeader.appendChild(pageHeaderDate);
    pageHeader.appendChild(updateButton);
    pageHeader.appendChild(saveButton);
    pageHeader.appendChild(deleteButton);
    pageHeader.appendChild(cancelButton);
    return pageHeader;
}

function createPageContent({ comment }) {
    const pageContent = document.createElement('div');
    pageContent.classList.add('page-content');

    const pageContentImg = document.createElement('div');
    pageContentImg.classList.add('page-content__img');

    const pageContentMessage = document.createElement('textarea');
    pageContentMessage.classList.add('page-content__comment');
    pageContentMessage.setAttribute('data-name', 'comment');
    pageContentMessage.setAttribute('maxlength', 1000);
    pageContentMessage.value = comment;
    pageContentMessage.readOnly = true;

    pageContent.appendChild(pageContentImg);
    pageContent.appendChild(pageContentMessage);
    return pageContent;
}

function yymmddhhmm(dateTime) {
    const now = dateTime ? new Date(dateTime) : new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
}