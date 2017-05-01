import React from 'react';

class UpdateImage extends React.Component{
	constructor(props) {
        super(props);
        this.state = {
            submitted: false
        }
    }
    submission(){
        if(this.state.submitted){
            return(
                <div>
                    <img src="/ring.gif" height="50px"/>
                </div>
            )
        }
        else{
            return(
                <div>
                    <a href="#" className="button button-fill button-raised my-crunch-btn" onClick={this.updateImage.bind(this)}>Update Image</a> 
                </div>
            )
        }
    }
    updateImage(){
        event.preventDefault();
        this.setState({submitted: true});
        var myApp = new Framework7();

        var data = {
            image: window.myImage,
        }
        console.log(data)
        Meteor.call('page.addImage', data, (error,data)=>{
            if(error){
                console.log(error);
                window.myImage = "";
                this.setState({submitted: false});
                var myApp = new Framework7();
                myApp.alert(`Image not saved!`, `Warning!`);
            }
            else{
                console.log(data);
                window.myImage = "";
                this.setState({submitted: false});
                var myApp = new Framework7();
                myApp.closeModal();
                myApp.alert(`Image Saved!`, `Hurray!`);

            }
        })
    }
	componentDidMount() {
        var myApp = new Framework7();
        var calendarDefault = myApp.calendar({
            input: '#calendar-default',
        });  
        var $$ = Framework7.$;

        function gotPic(event) {
            if (event.target.files.length === 1 && event.target.files[0].type.indexOf('image/') === 0) {
                $$('#avatar').attr('src', URL.createObjectURL(event.target.files[0]));
            }
        }

        $$('#avatarCapture').on('change', gotPic);

    } 
	closeModal(){
        var myApp = new Framework7();
        myApp.closeModal();
    }
    onDrop(evt){
         var handleFileSelect = function(evt) {
            var files = evt.target.files;
            var file = files[0];

            if (files && file) {
                var reader = new FileReader();

                reader.onload = function(readerEvt) {
                    var binaryString = readerEvt.target.result;
                    var imageString = btoa(binaryString)
                    window.myImage = imageString;
                };

                reader.readAsBinaryString(file);
            }
        };

        if (window.File && window.FileReader && window.FileList && window.Blob) {
            document.getElementById('avatarCapture').addEventListener('change', handleFileSelect, false);
        } else {
            alert('The File APIs are not fully supported in this browser.');
        }
        handleFileSelect(evt);
   
    }
	render(){
		return(
			<div>
				<div className="content-block my-no-padding">
                  <div className="navbar theme-green my-card-3">
                    <div className="navbar-inner">
                        <div className="right my-left-5"><i onClick={this.closeModal.bind(this)} className="fa fa-times"></i></div>
                    </div>
                  </div>
                  <div className="my-break-40"></div>
               </div>
               <div className="my-break-40">Choose Image</div>

                <input type="file" name="myHiddenField" accept="image/*" id="avatarCapture" onChange={this.onDrop.bind(this)}/>
                <img id="avatar"/>    
                {this.submission()}
			</div>
		)
	}
}

export default UpdateImage;