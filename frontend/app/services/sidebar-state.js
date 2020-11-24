import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
	isSidebarOpen: false,

	toggleSidebar() {
		this._super(...arguments);
		if($("#mySidebar").width() > 240) {
  				document.getElementById("mySidebar").style.width = "0";
		  		document.getElementById("top-logo").style.marginLeft = "0";
		  		let chatbox = document.getElementById("chatbox");
	  			if (chatbox) {
	  				document.getElementById("chatbox").style.marginLeft = "0";
	  			}
  			
		  		
		  		// $('.header').css('paddingRight', '0px');
		  		$('#closeButton').removeClass("closebtnmargin");
		  		this.set('isSidebarOpen', false);
		} else {
			this.set('isSidebarOpen', true);
			document.getElementById("mySidebar").style.width = "250px";
  			document.getElementById("top-logo").style.marginLeft = "250px";
  			let chatbox = document.getElementById("chatbox");
  			if (chatbox) {
  				document.getElementById("chatbox").style.marginLeft = "250px";
  			}
  			
  			// $('.header').css('marginRight', '250px');
  			$('#closeButton').removeClass("closebtnmargin");

		}
		console.log("SIDEBAR STATE : ", this.get('isSidebarOpen'));
	}
});
