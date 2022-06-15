document.addEventListener('DOMContentLoaded', function()
{
    /* --- 01/ VARIABLES --- */

    let canvas = document.querySelector('canvas');
    let buttonStroke = document.querySelector('button.stroke-toggle');
    let buttonFill = document.querySelector('button.fill-toggle');
    let colorButtons = document.querySelectorAll('.colors button');
    let sizeButtons = document.querySelectorAll('.sizes span');

    let buttonUndo = document.querySelector('button.undo');
    let buttonRedo = document.querySelector('button.redo');

    let cursorPreview = document.querySelector('.cursor-preview');
    
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

    let selectedSize = sizes['small'];
    let selectedColor = colors['black'];

    let pathHistory = [];
    let undoHistory = [];
    

    /* --- 02/ FUNCTIONS --- */

    /* --- Mouse events --- */

    function drawStart(event)
    {
        if((event.clientX < canvas.width)
            && (event.clientY < canvas.height)
        )
        {
            isDrawing = true;

            context.beginPath();
            historyBeginPath();

            // clear undo history
            undoHistory = [];
        }
    }

    function drawStop(event)
    {
        if((event.clientX < canvas.width)
            && (event.clientY < canvas.height)
        )
        {
            isDrawing = false;
            context.closePath();
        }
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

            historyAddPath(
                event.clientX,
                event.clientY,
                context.fillStyle,
                context.lineWidth
            );
        }
        else
        {
            context.moveTo(event.clientX, event.clientY);
        }

        cursorPreview.style.top = event.clientY + 'px';
        cursorPreview.style.left = event.clientX + 'px';

        if((event.clientX < canvas.width)
            && (event.clientY < canvas.height)
        )
        {
            cursorPreview.style.display = 'block';
        }
        else
        {
            cursorPreview.style.display = 'none';
        }
    }

    /* --- Style change --- */

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

        cursorPreview.style.backgroundColor = window.getComputedStyle(this).backgroundColor;

        for(button of sizeButtons)
        {
            button.style.backgroundColor = window.getComputedStyle(this).backgroundColor;
        }

        selectedColor = window.getComputedStyle(this).backgroundColor;
    }

    function sizeChange()
    {
        for(button of sizeButtons)
        {
            button.classList.remove('selected');
        }

        this.classList.add('selected');

        context.lineWidth = sizes[this.id];

        cursorPreview.style.width = sizes[this.id] + 'px';
        cursorPreview.style.height = sizes[this.id] + 'px';

        selectedSize = sizes[this.id];
    }

    /* --- History feature --- */

    function historyBeginPath()
    {
        pathHistory.push([]);
    }

    function historyAddPath(x, y, color, size)
    {
        pathHistory[pathHistory.length - 1].push({
            x:x,
            y:y,
            color:color,
            size:size
        });
    }

    function historyUndo()
    {
        context.clearRect(0, 0, canvas.width, canvas.height);

        undoHistory.push(pathHistory[pathHistory.length - 1]);

        pathHistory.pop();

        drawPaths(pathHistory);

        setCanvasStyle();
    }

    function historyRedo()
    {
        context.clearRect(0, 0, canvas.width, canvas.height);

        pathHistory.push(undoHistory[undoHistory.length - 1]);
        undoHistory.pop();

        drawPaths(pathHistory);

        setCanvasStyle();
    }

    function drawPaths(pathsList)
    {
        for(path of pathsList)
        {
            context.beginPath();

            for(coordonate of path)
            {
                context.fillStyle = context.strokeStyle = coordonate.color;
                context.lineWidth = coordonate.size;


                context.lineTo(coordonate.x, coordonate.y);
                
                context.stroke();
            }

            context.closePath();
        }
    }

    function setCanvasStyle()
    {
        context.fillStyle = selectedColor;
        context.strokeStyle = selectedColor;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.lineWidth = selectedSize;

        cursorPreview.style.backgroundColor = selectedColor;
        cursorPreview.style.width = selectedSize + 'px';
        cursorPreview.style.height = selectedSize + 'px';
    }

    /* --- 03/ LISTENERS --- */

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

    buttonUndo.addEventListener('click', historyUndo);
    buttonRedo.addEventListener('click', historyRedo);

    setCanvasStyle()
});