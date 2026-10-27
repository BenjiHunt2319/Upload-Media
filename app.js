const loading = document.getElementById("loading");
const fileDropArea = document.getElementById('file-drop-area');
const selectFile = document.getElementById("select-file");
const loadedFile = document.getElementById("selected-file");
const fileDetails = document.getElementById("file-details");
const tagForm = document.getElementById("tag-form");
const createTag = document.getElementById("create-tag");
const addTag = document.getElementById("add-tag");
const tagList = document.getElementById("tag-list");
const message = document.getElementById("message");

fileDropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileDropArea.classList.add('highlight');
});

fileDropArea.addEventListener('dragleave', () => {
    fileDropArea.classList.remove('highlight');
});

fileDropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    fileDropArea.classList.remove('highlight');
    const files = e.dataTransfer.files;
    handleFiles(files);
});

document.getElementById('file-input').addEventListener('change', (e) => {
    const files = e.target.files;
    handleFiles(files);
});

let currentImageOrVideo = null;

function handleFiles(files) {
    if (currentImageOrVideo) {
        currentImageOrVideo.remove();
    }

    for (const file of files) {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = document.getElementById("selected-file");
                img.src = e.target.result;
                currentImageOrVideo = img;
                selectFile.classList.add('hidden');
                setTimeout(() => {
                    fileDetails.classList.remove("hidden");
                    loading.classList.add("hidden");
                }, 1500);
            };
            reader.readAsDataURL(file);
            break;
        } else if (file.type.startsWith('video/')) {
            break; 
        }
    }
}

createTag.addEventListener("click", () => {
    tagForm.classList.remove("hidden");
    fileDetails.classList.add("blur-[3px]");
});

// Event listener for the "Add Tag" button
addTag.addEventListener("click", () => {
    const tagInput = document.getElementById("tag-input");
    const tagClasses = ["rounded-md", "px-4", "p-1", "bg-[#09043C]", "text-sm"];
    const newTag = document.createElement("span");
    tagClasses.forEach(classes => newTag.classList.add(classes));
    newTag.innerHTML = tagInput.value;
    tagList.appendChild(newTag);
    tagInput.value = "";
    fileDetails.classList.remove("blur-[3px]");
    tagForm.classList.add("hidden");
});


const upload = document.getElementById("upload");
const uploadProgress = document.getElementById("uploadProgressInner");
let progress = 0;

upload.addEventListener("click", (e) => {
    const intervalId = setInterval(() => {
        if (progress >= 100) {
            clearInterval(intervalId);

            message.classList.remove("hidden");
            fileDetails.classList.add("hidden");
            loadedFile.src = "";
            uploadProgress.style.width = 0;
            upload.disabled = false;
            upload.removeAttribute("data-disable-btn");

            setTimeout(() => {
                location.reload();
            }, 1500);
        }
         else {
            progress += 10;
            uploadProgress.style.width = progress + "%";
            upload.disabled = true;
            upload.setAttribute("data-disable-btn", true);
        }
    }, 1000);
});
