const inputImage = (file,setImageError,setImageName,setImageDataUrl)=>{ 
    if (file) {
    const fileName = file.name;
    const fileExtension = fileName.split(".").pop().toLowerCase();
    if (
        fileExtension === "jpg" ||
        fileExtension === "jpeg" ||
        fileExtension === "png"
    ) {
        setImageError({ status: "", disabled: "" });
        setImageName({ name: fileName });

const reader = new FileReader();
reader.onload = (e) => {
    const dataURL = e.target.result;
    setImageDataUrl(dataURL);
};
reader.readAsDataURL(file); 
} else {
    setImageName({ name: "" });
    setImageDataUrl("");
    setImageError({
        disabled: "y",
        status: "Debe seleccionar una imagen valida. (.jpg .png .jpeg)",
    });
}}}

export default inputImage;