import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

let posts = [];
let model;

function loadPosts() {
  // Fetch posts from a server or local file
  fetch('posts.json')
    .then(response => response.json())
    .then(data => {
      posts = data;
      const blogPostsElement = document.getElementById('blog-posts');
      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.content}</p>
          <p>${post.date}</p>
        `;
        blogPostsElement.appendChild(postElement);
      });
    });
}

function loadModel() {
  const loader = new FBXLoader();
  loader.load('models/model.fbx', function (object) {
    model = object;
    const modelDisplayElement = document.getElementById('model-display');
    const scene = new THREE.Scene();
    scene.add(model);
    const renderer = new THREE.WebGLRenderer();
    modelDisplayElement.appendChild(renderer.domElement);
    const animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  });
}

export { loadPosts, loadModel, posts, model };