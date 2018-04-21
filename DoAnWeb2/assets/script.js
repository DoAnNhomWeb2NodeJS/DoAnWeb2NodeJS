$('#chon-giadau').TouchSpin({
    min: 0,
    max: 1000000000,
    initval: 0,
    stepinterval: 50,
    maxboostedstep: 10000000,
    // prefix: 'đ',
    postfix: 'đ'
});

// thanh toolbar trong input nhập chi tiết
tinymce.init({
    selector: '#txtchitiet',
    menubar: false,
    plugins: 'advlist autolink lists link image charmap print preview anchor textcolor',
    toolbar1: 'insert | undo redo | styleselect | fontselect | bold italic underline forecolor | bullist numlist | removeformat |',
    // toolbar2: "",
    
    //height: 300,
    // encoding: "xml",
});