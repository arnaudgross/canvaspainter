document.addEventListener('DOMContentLoaded', function()
{
    /* --- VARIABLES --- */

    let canvas = document.querySelector('canvas');
    let buttonStroke = document.querySelector('button.stroke-toggle');
    let buttonFill = document.querySelector('button.fill-toggle');
    let colorButtons = document.querySelectorAll('.colors button');
    let sizeButtons = document.querySelectorAll('.sizes button');
    
    let context = canvas.getContext('2d');

    let isDrawing = false;
    let strokeActive = true;

    const colors = {
        'black': '#333333',
        'red': '#DA0F10',
        'yellow': '#FFB321',
        'white': '#F9F9F9',
        'sable': '#FFE3BF',
        'rose': '#FFB1B1',
    }

    const sizes = {
        'small': 5,
        'medium': 15,
        'large': 30,
        'xlarge': 50,
    }
    

    /* --- FUNCTIONS --- */

    function drawStart()
    {
        isDrawing = true;
        context.beginPath();
    }

    function drawStop()
    {
        isDrawing = false;
        context.closePath();
    }

    function mouseDraw(event)
    {
        if(isDrawing)
        {
            context.lineTo(event.clientX, event.clientY);

            if(strokeActive)
            {
                context.stroke();
            }
            else
            {
                context.fill();
            }
        }
        else
        {
            context.moveTo(event.clientX, event.clientY);
        }
    }

    function strokeActivate()
    {
        if(this.id == "stroke-activate")
        {
            strokeActive = true;
            buttonStroke.classList.add('selected');
            buttonFill.classList.remove('selected');
        }
        else if(this.id == "fill-activate")
        {
            strokeActive = false;
            buttonStroke.classList.remove('selected');
            buttonFill.classList.add('selected');
        }
    }

    function colorChange()
    {
        for(button of colorButtons)
        {
            button.classList.remove('selected');
        }

        this.classList.add('selected');

        context.fillStyle = context.strokeStyle = window.getComputedStyle(this).backgroundColor;
    }

    function sizeChange()
    {
        for(button of sizeButtons)
        {
            button.classList.remove('selected');
        }

        this.classList.add('selected');

        context.lineWidth = sizes[this.id];
    }

    /* --- LISTENERS --- */

    document.addEventListener('mousemove', mouseDraw);
    document.addEventListener('mousedown', drawStart);
    document.addEventListener('mouseup', drawStop);

    buttonStroke.addEventListener('click', strokeActivate);
    buttonFill.addEventListener('click', strokeActivate);

    for(button of colorButtons)
    {
        button.addEventListener('click', colorChange);
    }

    for(button of sizeButtons)
    {
        button.addEventListener('click', sizeChange);
    }

    context.fillStyle = "#000000";
    context.strokeStyle = "#000000";
    context.lineCap = "round";
    context.lineWidth = 4;
});