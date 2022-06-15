class DrawContext
{
    context;
    isDrawing;
    strokeActive = false;

    sizes = {
        'small': 5,
        'medium': 15,
        'large': 30,
        'xlarge': 50,
    }

    constructor(canvas)
    {
        this.context = canvas.getContext('2d');
    }

    drawStart()
    {
        this.isDrawing = true;
        this.context.beginPath();
    }

    drawStop()
    {
        this.isDrawing = false;
        context.closePath();
    }

    mouseDraw(event)
    {
        if(this.isDrawing)
        {
            this.context.lineTo(event.clientX, event.clientY);

            if(this.strokeActive)
            {
                this.context.stroke();
            }
            else
            {
                this.context.fill();
            }
        }
        else
        {
            this.context.moveTo(event.clientX, event.clientY);
        }
    }

    strokeActivate(event)
    {
        if(event.currentTarget.id == "stroke-activate")
        {
            this.strokeActive = true;
            buttonStroke.classList.add('selected');
            buttonFill.classList.remove('selected');
        }
        else if(event.currentTarget.id == "fill-activate")
        {
            this.strokeActive = false;
            buttonStroke.classList.remove('selected');
            buttonFill.classList.add('selected');
        }
    }

    colorChange(event)
    {
        for(button of colorButtons)
        {
            button.classList.remove('selected');
        }

        event.currentTarget.classList.add('selected');

        this.context.fillStyle = context.strokeStyle = window.getComputedStyle(event.currentTarget).backgroundColor;
    }

    sizeChange(event)
    {
        for(button of sizeButtons)
        {
            button.classList.remove('selected');
        }

        event.currentTarget.classList.add('selected');

        this.context.lineWidth = this.sizes[this.id];
    }
}