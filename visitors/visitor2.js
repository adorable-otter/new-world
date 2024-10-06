

const nameInput = document.getElementsByClassName('user-input')[0];
const commentInput = document.getElementsByClassName('user-input')[1];
const addBtn = document.getElementById('addBtn');
const container = document.getElementById('container');
const book = document.querySelector('ul')
const comments = new Map();

document.addEventListener('DOMContentLoaded', () => {
    addBtn.addEventListener('click', addComment);
    commentInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            addComment();
        }
    });
    nameInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            addComment();
        }
    });
    book.addEventListener('click', handleBtnClickInPageHeader);
    createBookPage({ name: '정청', comment: '어이 브라더' });
    document.querySelector('#review').addEventListener('click', review);
});

function handleBtnClickInPageHeader(e) {
    const target = e.target;
    const name = target.dataset.name;
    const li = target.closest('li');
    const commentId = Number(li.dataset.id);
    const comment = li.querySelector('textarea[data-name=comment]')

    if (target.nodeName === 'BUTTON') {
        if (name === 'delete') {
            li.remove();
            comments.delete(commentId);
            return;
        } else if (name === 'update') {
            comment.readOnly = false;
        } else if (name === 'save') {
            comment.readOnly = true;
            comments.set(commentId, comment.value);
        } else if (name === 'cancel') {
            comment.readOnly = true;
            comment.value = comments.get(commentId);
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
function addComment() {
    const name = nameInput.value;
    const comment = commentInput.value;
    if (name && comment) {
        createBookPage({ name, comment });
        nameInput.value = '';
        commentInput.value = '';
    } else {
        alert('이름과 댓글을 모두 입력하세요!');
    }
}

function createBookPage(inputData) {
    const page = document.createElement('li');
    const id = new Date().getTime();
    page.classList.add('book__page');
    page.setAttribute('data-id', id)
    page.appendChild(createPageHeader(inputData));
    page.appendChild(createPageContent(inputData));

    document.querySelector('ul').appendChild(page);
    comments.set(id, inputData.comment);
}

function createPageHeader({ name }) {
    const pageHeader = document.createElement('div');
    pageHeader.classList.add('page-header');

    const pageHeaderName = document.createElement('div');
    pageHeaderName.classList.add('page-header__name');
    pageHeaderName.textContent = name;

    const pageHeaderDate = document.createElement('div');
    pageHeaderDate.classList.add('page-header__date');
    pageHeaderDate.textContent = `( ${yymmddhhmm()} )`;

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

function createPageContent({ comment, profileImg }) {
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

    if (profileImg) {
        pageContentImg.style.backgroundImage = `url(${profileImg})`;
        pageContentImg.classList.add('page-content__img_review');
    }
    pageContent.appendChild(pageContentImg);
    pageContent.appendChild(pageContentMessage);
    return pageContent;
}

function yymmddhhmm() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}`;
}

function review() {
    document.querySelector('ul').replaceChildren();
    createBookPage({ name: '박상기', comment: '아주 아주 열정적인 팀원들과 같이 실시간으로 성장하는 느낌이 들어서 좋았습니다.\n프로젝트를 진행하는 내내 따뜻하고 웃음이 끊이지 않아서 너무 좋았습니다.', profileImg: 'https://postfiles.pstatic.net/MjAyNDEwMDNfMjY4/MDAxNzI3OTUwMTczNjA2.R5uqeaw5qZC5xmXnK84_X6yDGZSmXdnHgwG_qonRBIQg.cXEDfho3vASK-hjOb-jnNT-LCuw7jzO7XjzhSis5C_kg.JPEG/%EB%B0%95%EC%83%81%EA%B8%B0.jpg?type=w966' });
    createBookPage({ name: '정은혜', comment: '코딩을 시작한 지 얼마 안 돼서 프로젝트에 참여한다는 것이 부담스러워 중간에 포기할 뻔 했으나,\n팀원들의 격려와 응원으로 두려움을 극복할 수 있었습니다.\n많은 것을 알려준 팀원들에게 정말 고맙습니다!', profileImg: 'https://postfiles.pstatic.net/MjAyNDEwMDNfNjkg/MDAxNzI3OTI1ODY5MjM1.Zk4Yvfcwc3PdlIYmHOxytFBZTf6wjtB9YY822UGKO3cg.gS9Ftn3KibBLHxr5dAGHBLbwim9tvoG0FJ1nlb0bO4Ig.JPEG/%EC%A0%95%EC%9D%80%ED%98%9C.jpg?type=w966' });
    createBookPage({ name: '박준석', comment: '다들 처음 시작하는거라 어려움이 많았음에도 불구하고 누구 한 명 소극적인 모습 없이\n적극적으로 다 같이 고민하고 해결하려는 모습이 보였습니다.\n한 층 더 성장할 수 있는 좋은시간 이었습니다.', profileImg: 'https://postfiles.pstatic.net/MjAyNDEwMDNfMjIx/MDAxNzI3OTUwMTczNjE3.bzMWKXJ7-FT_Eov94hhcmueiVcdLI6KZp4a1sUgvLQYg.s79DijTJYJp8LU7WK2W2l7dgH1KgZwO8u2vODYyTvzUg.JPEG/%EB%B0%95%EC%A4%80%EC%84%9D.jpg?type=w966' });
    createBookPage({ name: '강대은', comment: '프로젝트하면서 아직 개념이 많이 부족하다는걸 느꼈습니다.\n틈틈이 개념, 용어 정리를 하여 빠른 시일 내에 함수를 자유자재로 써먹을 수 있도록 하겠습니다.', profileImg: 'https://postfiles.pstatic.net/MjAyNDEwMDNfMTE4/MDAxNzI3OTU0NjIyNTY5.KopoK_m7H7XaU9JzX05M75NGXIfsyta2RuHkJpZcB3Mg.mDahz2GPcVdb4XmfLEjDU7P9b3bLyNmhcPjCKm1cJ-8g.JPEG/%EA%B0%95%EB%8C%80%EC%9D%80.jpg?type=w966' });
    createBookPage({ name: '신상용', comment: '이번 프로젝트를 진행하며 여러사람들 과 결과물을 만들어내는것에 성취감을 느낄수있었으며\n많은시간을 쓰기보다는 시간을 효율적으로 쓰는것에 소중함을 느낄수 있었습니다...', profileImg: 'https://postfiles.pstatic.net/MjAyNDEwMDNfMjQ2/MDAxNzI3OTU0NjIyNTUw.15wTdBcrHsuMMefovXxyvZnFvPBcdpU5WSJyw6V101cg.BYH2HEG3w9a4rFyrZqStZQo0gfAT8dsmHpm9lh9Dv2kg.JPEG/%EC%8B%A0%EC%83%81%EC%9A%A9.jpg?type=w966' });
}