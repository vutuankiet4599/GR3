export const FileUtil = {
    Download: (link, filename) => {
        fetch(link)
            .then((response) => response.blob())
            .then((blob) => {
                const blobURL = window.URL.createObjectURL(new Blob([blob]));
                const aTag = document.createElement("a");
                aTag.href = blobURL;
                aTag.setAttribute("download", filename);
                document.body.appendChild(aTag);
                aTag.click();
                aTag.remove();
            });
    },
};
