import React, {Component} from 'react';

class DealCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img64: null,
            submitted: false
        }
    }
    closeCreate(){
        var myApp = new Framework7();
        myApp.closeModal();
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
    makeDeal(){
        event.preventDefault();
        this.setState({submitted: true});
        var myApp = new Framework7();

        var title = this.refs.title.value.trim();
        var cal = document.getElementById('calendar-default').value;
        var data = {
            pic: window.myImage,
            title: title,
            date: cal
        }
        console.log(data)
        Meteor.call('deal.makeDeal', data, (error,data)=>{
            if(error){
                console.log(error);
                this.setState({submitted: false});
                var myApp = new Framework7();
                myApp.alert("Deal not created","Warning!");
            }
            else{
                console.log(data);
                this.refs.title.value = "";
                window.myImage = "";
                this.setState({submitted: false});
                document.getElementById('calendar-default').value = "";
                var myApp = new Framework7();
                myApp.closeModal();

            }
        })
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
                    <a href="#" className="button button-fill color-green button-raised my-crunch-btn" onClick={this.makeDeal.bind(this)}>Make Deal</a> 
                </div>
            )
        }
    }
    render(){
        return (
        	<div>
        		<div className="navbar theme-green my-card-3">
                    <div className="navbar-inner">
                        <div className="right my-left-5"><i onClick={this.closeCreate.bind(this)} className="fa fa-times"></i></div>
                    </div>
                </div>
                <div className="my-card-container">
                    <h2>Create Deal</h2>
                    <div className="list-block">
                        <ul>
                          <li className="item-content">
                            <div className="item-inner">
                              <div className="item-input">
                                <input type="text" ref="title" placeholder="Daily Special"/>
                              </div>
                              
                            </div>
                          </li>
                          <div className="my-break-40"></div>
                          <li>
                              <div className="item-content">
                                <div className="item-inner">

                                  <div className="item-input">
                                    <input className="not-empty-state" type="text" placeholder="Click to Choose Date" readOnly id="calendar-default"/>
                                  </div>
                                </div>
                              </div>
                          </li>
                          <div className="my-break-40">Choose Image</div>
                          <li>
                            <input type="file" name="myHiddenField" accept="image/*" id="avatarCapture" onChange={this.onDrop.bind(this)}/>
                            <img id="avatar"/>    
                          </li>
                          <div className="my-break-40"></div>   
                        </ul>
                         
                    </div>
                    <div className="my-break-100"></div>
                    {this.submission()}
                </div>
        	</div>
        );
    }
}

export default DealCreate;






