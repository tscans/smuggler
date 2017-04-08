import React, {Component} from 'react';

const RANDICONS = [" fa-university"," fa-bell"," fa-bicycle"," fa-calculator"," fa-bullhorn"," fa-cube"," fa-diamond"," fa-coffee"," fa-bolt"," fa-gamepad"," fa-gift"," fa-hand-peace-o"," fa-fighter-jet"," fa-car"," fa-train"," fa-cog"," fa-money"," fa-wrench"," fa-tachometer"," fa-signal"," fa-music"," fa-heart"," fa-futbol-o"," fa-beer"," fa-cloud"," fa-bug"," fa-flag-checkered"," fa-gavel"," fa-newspaper-o"," fa-magnet"," fa-hand-rock-o","fa-anchor","fa-bullseye","fa-balance-scale","fa-binoculars","fa-cubes","fa-thumbs-up", "fa-spoon","fa-shield "];
const RANDCOLORS = ["red","blue", "green", "yellow", "orange", "purple", "black", "pink", "turquoise"];

class DealCreate extends Component {
    constructor(props) {
        super(props);
        var randI = RANDICONS[Math.floor(Math.random() * RANDICONS.length)];
        var randC = RANDCOLORS[Math.floor(Math.random() * RANDCOLORS.length)];
        this.state = {
            randI: randI,
            randC: randC,
            img64: null
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
    randomIC(){
        var randI = RANDICONS[Math.floor(Math.random() * RANDICONS.length)];
        var randC = RANDCOLORS[Math.floor(Math.random() * RANDCOLORS.length)];
        this.setState({randI: randI, randC: randC});
    }
    makeDeal(){
        event.preventDefault();
        this.setState({loading: true});
        var myApp = new Framework7();

        var title = this.refs.title.value.trim();
        var details = this.refs.details.value.trim();
        var cal = document.getElementById('calendar-default').value;
        var data = {
            pic: window.myImage,
            title: title,
            details: details,
            randomicon: this.state.randI,
            randomcolor: this.state.randC,
            date: cal
        }
        console.log(data)
        Meteor.call('deal.makeDeal', data, (error,data)=>{
            if(error){
                console.log(error);
            }
            else{
                console.log(data);
                this.refs.title.value = "";
                this.refs.details.value = "";
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
    render() {
        return (
        	<div>
        		<div className="navbar theme-green my-card-3">
                    <div className="navbar-inner">
                        <div className="right my-left-5"><i onClick={this.closeCreate.bind(this)} className="fa fa-times"></i></div>
                    </div>
                </div>
                <h2>Create Deal</h2>
                <div className="list-block">
                    <ul>
                      <li className="item-content">
                        <div className="item-inner">
                          <div className="item-title label">Deal Title</div>
                          <div className="item-input">
                            <input type="text" ref="title" placeholder="Deal Title"/>
                          </div>
                          
                        </div>
                      </li>
                      <li className="item-content">
                        <div className="item-inner">
                          <div className="item-title label">Details</div>
                          <div className="item-input">
                              <textarea ref="details" placeholder="About (25 char min)"></textarea>
                          </div>
                        </div>
                      </li>
                      <div className="my-break-40"></div>
                      <li>
                          <div className="item-content">
                            <div className="item-inner">

                              <div className="item-input">
                                <input className="not-empty-state" type="text" placeholder="Select Day for Deal" readOnly id="calendar-default"/>
                              </div>
                            </div>
                          </div>
                      </li>
                      <li className="item-content">
                        <div className="col-20"></div>
                        <div className="col-20">
                            <a href="#" className="button button-fill button-raised" onClick={this.randomIC.bind(this)}>Choose Random Icon</a> 
                        </div>
                        <div className="col-60">
                            <h1><i className={"my-right-push fa "+this.state.randI+" icon-super-large "+ " ic-"+this.state.randC}></i></h1>
                        </div>
                      </li>  
                      <div className="my-break-40">Choose Image</div>
                      <li>
                        <input type="file" capture="camera" name="myHiddenField" accept="image/*" id="avatarCapture" onChange={this.onDrop.bind(this)}/>
                        <img id="avatar"/>    
                      </li>
                      <div className="my-break-40"></div>   
                    </ul>
                     
                </div>
                <div className="my-break-100"></div>
                <a href="#" className="button button-fill button-raised" onClick={this.makeDeal.bind(this)}>Make Deal</a> 
        	</div>
        );
    }
}

export default DealCreate;






