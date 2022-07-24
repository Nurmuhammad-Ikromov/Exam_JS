const userList = document.querySelector('.user-list');
const postList = document.querySelector('.post-list');
const commentList = document.querySelector('.comment-list');
const userTemplate = document.querySelector('.user-list__template').content;
const postTemplate = document.querySelector('.post-list__template').content;
const commentTemplate = document.querySelector(
	'.comment-list__template',
).content;

let userFragment = document.createDocumentFragment();
function renderUsers(array, node) {
	array.forEach((element) => {
		const newTemplate = userTemplate.cloneNode(true);
		newTemplate.querySelector('.user-list__id').textContent = +element.id;
		newTemplate.querySelector('.user-list__username').textContent =
			element.username;
		newTemplate.querySelector('.user-list__name').textContent =
			element.name;
		newTemplate.querySelector('.user-list__email').textContent =
			element.email;
		newTemplate.querySelector('.user-list__street').textContent =
			element.address.street + ' street,  ';
		newTemplate.querySelector('.user-list__suite').textContent =
			element.address.suite + ' suite,  ';
		newTemplate.querySelector('.user-list__city').textContent =
			element.address.city + ' city.';

		newTemplate.querySelector('.user-list__zipcode').textContent =
			element.address.zipcode + ' zipcode, ';

		newTemplate.querySelector('.user-list__phone').textContent =
			element.phone;

		newTemplate.querySelector('.user-list__website').textContent =
			element.website;
		newTemplate.querySelector('.user-list__company-name').textContent =
			'# ' + element.company.name;
		newTemplate.querySelector('.user-list__company-catch').textContent =
			' # ' + element.company.catchPhrase;
		newTemplate.querySelector('.user-list__company-bs').textContent =
			' # ' + element.company.bs;

		newTemplate.querySelector(
			'.user-list__location',
		).href = `https://www.google.com/maps/place/${element.address.geo.lat},${element.address.geo.lng}`;

		newTemplate.querySelector('.user-list__item').dataset.itemId =
			element.id;

		userFragment.appendChild(newTemplate);
	});

	node.appendChild(userFragment);
}

let postFragment = document.createDocumentFragment();
function renderPosts(array, node) {
	node.innerHTML = '';
	array.forEach((element) => {
		const newTemplate = postTemplate.cloneNode(true);

		newTemplate.querySelector('.post-list__title').textContent =
			element.title;
		newTemplate.querySelector('.post-list__text').textContent =
			' ' + element.body;

		newTemplate.querySelector('.post-list__item').dataset.itemPostId =
			element.id;

		postFragment.appendChild(newTemplate);
	});

	node.appendChild(postFragment);
}

let commentFragment = document.createDocumentFragment();
function renderComments(array, node) {
	node.innerHTML = '';
	array.forEach((element) => {
		const newTemplate = commentTemplate.cloneNode(true);

		newTemplate.querySelector('.comment-list__name').textContent =
			element.name;
		newTemplate.querySelector('.comment-list__email').textContent =
			element.email;
		newTemplate.querySelector('.comment-list__text').textContent =
			element.body;

		commentFragment.appendChild(newTemplate);
	});

	node.appendChild(commentFragment);
}

async function userFetch() {
	const res = await fetch('https://jsonplaceholder.typicode.com/users');
	const data = await res.json();

	renderUsers(data, userList);
}

userFetch();

let postData = [];
async function postFetch() {
	const res = await fetch('https://jsonplaceholder.typicode.com/posts');
	const data = await res.json();
	data.forEach((el) => {
		postData.push(el);
	});
	renderPosts(data, postList);
}

postFetch();

let commentData = [];
async function commentFetch() {
	const res = await fetch('https://jsonplaceholder.typicode.com/comments');
	const data = await res.json();
	data.forEach((el) => {
		commentData.push(el);
	});
	renderComments(data, commentList);
}

commentFetch();

let trn = -150;
postList.style.transform = `translateY(${trn}%)`;
userList.addEventListener('click', (evt) => {

	if (evt.target.matches('.user-list__item')) {
		let checkPostId = evt.target.dataset.itemId;
		trn = 0;
		postList.style.transform = `translateY(${trn}%)`;
		let checkPost = postData.filter((el) => el.userId == checkPostId);
		cmt = 150
		commentList.style.transform =`translateX(${cmt}%)`;
		console.log(checkPost);
		renderPosts(checkPost, postList);
	}


});

let cmt = 150
commentList.style.transform =`translateX(${cmt}%)`;

postList.addEventListener('click', (evt) => {
	if (evt.target.matches('.post-list__item')) {
		let checkCommentId = evt.target.dataset.itemPostId;
		cmt = 0
		commentList.style.transform =`translateX(${cmt}%)`;
		let checkComment = commentData.filter(
			(el) => el.postId == checkCommentId,
		);
		renderComments(checkComment, commentList);
	}
});
