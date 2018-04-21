var Entity = Class.extend(function(){
    this.spriteSheet=undefined;	// Spritesheet associada � entidade
    this.eStates={}; 				// dicionario de estados. Objecto de arrays de estados
    this.frames= new Array();     // array com as frames atuais
    this.currentFrame=0;			// frame atual
    this.x=0;
    this.y=0;
    this.width=0;
    this.height=0;
    this.alpha=1;
    this.shadow={	active:false,
				shadowColor:"rgba(100, 100, 100, 0.5)",
				shadowOffsetX: 3,
				shadowOffsetY: 3,
				shadowBlur:3
			  };
    this.rotation=0;
    this.visible=true;
    this.active=true; // propriedade que indica que a entidade est� activa. Se active=false, n�o deve ser apresentada
    this.killed=false;
  
    this.vx=3;
    this.vy=3;
     this.scaleFactor=1;
  
  // ----------------------------------------------------------
  
    this.constructor= function(){};
  
    this.update=function(){};
  
    this.scale= function(scale){
	    /*this.height += scale;
        this.width += scale;
        this.x -= scale/2;
        this.y -= scale/2;*/
        this.scaleFactor=scale;
        this.resize();
    };

    this.resize=function(){
        var ar = this.width/this.height;
        this.width=this.width*this.scaleFactor;
        this.height=this.width/ar;
    };
  
    this.scaleX= function(scale){
        this.width += scale;
        this.x -= scale/2;
    };
  
    this.scaleY= function(scale){
	    this.height += scale;
        this.y -= scale/2;
    };
    /* */
    this.left  	= function (){return this.x;};
    this.right 	= function (){return this.x + this.width;};
    this.top	= function (){return this.y;};
    this.bottom	= function (){return this.y+ this.height;};
  
    this.isColliding=false;
  
    this.getCenterX = function(){ return this.x + (this.width * 0.5);}; // this.width >> 1; � mais eficiente
  
    this.getCenterY = function(){ return this.y + (this.height * 0.5);};
  
    this.getHalfWidth= function() {return this.width * 0.5;};
  
    this.getHalfHeight= function() {return this.height * 0.5;};

    this.getSprite=function(){
        return this.frames[this.currentFrame];
    };


    this.render=function(ds){
        if(!this.active) return;
        var sprite = this.getSprite();
        ds.drawImage(
            this.spriteSheet.img,
            sprite.x, sprite.y,
            sprite.width, sprite.height,
            this.x, this.y,
            this.width, this.height
        );
    };
  
    this.drawColisionBoundaries=function(ctx,boundingRect,boundingCircle, colorR, colorC){
	    if (ctx==undefined) return;
	    //if(boundingRect==undefined || boundingCircle==undefined)return;
	  
	    if(boundingRect){
             ctx.beginPath();
             ctx.rect(this.x, this.y, this.width, this.height);
             ctx.lineWidth = 1;
             ctx.strokeStyle = colorR!=undefined?colorR:"yellow";
             ctx.stroke();
	    }
        if(boundingCircle){
             ctx.beginPath();
             ctx.arc(this.getCenterX(), this.getCenterY(), (this.getHalfWidth()+this.getHalfHeight())/2, 0, 2 * Math.PI, false);
             ctx.lineWidth = 1;
             ctx.strokeStyle = colorC!=undefined?colorC:"blue";
             ctx.stroke();
        }
    };

    //hitTestPoint
    this.hitTestPoint = function (pointX, pointY){
        return  (pointX > this.left() && pointX < this.right() &&
				 pointY > this.top() && pointY < this.bottom());
    };
  /*
    //hitTestCircle

    this.hitTestCircle = function (otherEntity){
	    //completar
        var vx = this.getCenterX()-otherEntity.getCenterX();
        var vy = this.getCenterY()-otherEntity.getCenterY();

        var magnitude = Math.sqrt(vx*vx+vy*vy);
        var totalRadii = this.getHalfWidth() + otherEntity.getHalfWidth();

        return (magnitude<totalRadii);

    };//blockCircle

    this.blockCircle = function (otherEntity){
	    //completar
        var vx = this.getCenterX()-otherEntity.getCenterX();
        var vy = this.getCenterY()-otherEntity.getCenterY();

        var magnitude = Math.sqrt(vx*vx+vy*vy);
        var totalRadii = this.getHalfWidth() + otherEntity.getHalfWidth();

        if (magnitude<totalRadii){
            var overlap = totalRadii-magnitude;
            var dx = vx/magnitude;
            var dy = vy/magnitude;
            this.x+=overlap*dx;
            this.y+=overlap*dy;
            return true;
        } else {
            return false;
        }
    };

    //hitTestRectangle
*/
    this.hitTestRectangle = function(otherEntity){
        var hit = false;
        var vx = this.getCenterX() - otherEntity.getCenterX();
        var vy = this.getCenterY() - otherEntity.getCenterY();

        var combinedHalfWidths = this.getHalfWidth() + otherEntity.getHalfWidth();
        var combinedHalfHeights = this.getHalfHeight() + otherEntity.getHalfHeight();

        if(Math.abs(vx)<combinedHalfWidths) {
            //poderá estar a ocorrer uma colisão
            //temos testar também
            if (Math.abs(vy) < combinedHalfHeights) {
                hit = true;
            } else {
                hit=false;
            }
        }
        return hit;
    };//blockRectangle

    this.blockRectangle = function (otherEntity){
        //A variable to tell us which side the collision is occurring on
        var collisionSide = "";

        //Calculate the distance vector
        var vx = this.getCenterX() - otherEntity.getCenterX();
        var vy = this.getCenterY() - otherEntity.getCenterY();

        //Figure out the combined half-widths and half-heights
        var combinedHalfWidths = this.getHalfWidth() + otherEntity.getHalfWidth();
        var combinedHalfHeights = this.getHalfHeight() + otherEntity.getHalfHeight();

        //Check whether vx is less than the combined half widths
        if(Math.abs(vx) < combinedHalfWidths){
            //A collision might be occurring!
            //Check whether vy is less than the combined half heights
            if(Math.abs(vy) < combinedHalfHeights){
                //A collision has occurred! This is good!
                //Find out the size of the overlap on both the X and Y axes
                var overlapX = combinedHalfWidths - Math.abs(vx);
                var overlapY = combinedHalfHeights - Math.abs(vy);

                //The collision has occurred on the axis with the
                //*smallest* amount of overlap. Let's figure out which
                //axis that is

                if(overlapX >=  overlapY){
                    //The collision is happening on the X axis
                    //But on which side? vy can tell us
                    if(vy > 0){
                        collisionSide = "TOP";
                        //Move the rectangle out of the collision
                        this.y = this.y + overlapY;
                    }
                    else{
                        collisionSide = "BOTTOM";

                        //Move the rectangle out of the collision
                        this.y = this.y - overlapY;
                    }
                }
                else{
                    //The collision is happening on the Y axis
                    //But on which side? vx can tell us
                    if(vx > 0){
                        collisionSide = "LEFT";

                        // Mover a entidade para fora da colis�o
                        this.x = this.x + overlapX;
                    }
                    else{
                        collisionSide = "RIGHT";


                        // Mover a entidade para fora da colis�o
                        this.x = this.x - overlapX;
                    }
                }
            }
            else {
                //N�o h� colis�o
                collisionSide = -1;
            }
        }
        else {
            //N�o h� colis�o
            collisionSide = -1;
        }
        return collisionSide;
    };
});


