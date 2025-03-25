const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Variables iniciales para la transformación
    let translation = { x: 0, y: 0 };
    let rotation = 0;
    let scaling = { x: 1, y: 1 };
    let shearing = { x: 0, y: 0 };                                

    // Triángulo inicial
    const triangle = [
      { x: -50, y: -50 },
      { x: 50, y: -50 },
      { x: 0, y: 50 }
    ];


    // Dibujar el triángulo
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();

      // Aplicar transformaciones
      ctx.translate(canvas.width / 2 + translation.x, canvas.height / 2 + translation.y);
      ctx.rotate(rotation);
      ctx.scale(scaling.x, scaling.y);
      ctx.transform(1, shearing.y, shearing.x, 1, 0, 0);
      

      // Dibujar triángulo
      ctx.beginPath();
      ctx.moveTo(triangle[0].x, triangle[0].y);
      ctx.lineTo(triangle[1].x, triangle[1].y);
      ctx.lineTo(triangle[2].x, triangle[2].y);
      ctx.closePath();
      ctx.fillStyle = "skyblue";
      ctx.fill();
      ctx.stroke();
 
      ctx.restore();
    }

    // Transformaciones
    function rotate() {
      rotation += Math.PI / 6; // Rotar 30 grados
      draw();
    }

    function translateX() {
        translation.x += 10; // Trasladar 10px en X
        draw();
      }

      function translate_X() {
        translation.x -= 10; // Trasladar 10px en X
        draw();
      }
  
      function translateY() {
        translation.y += 10; // Trasladar 10px en Y
        draw();
      }

      function translate_Y() {
        translation.y -= 10; // Trasladar 10px en Y
        draw();
      }

    function scale() {
      scaling.x += 0.1; // Escalar 10% en X
      scaling.y += 0.1; // Escalar 10% en Y
      draw();
    }

    function shear() {
      shearing.x += 0.1; // Sesgar 0.1 en X
      shearing.y += 0.1; // Sesgar 0.1 en Y
      draw();
    }

    function reset() {
      // Resetear transformaciones
      translation = { x: 0, y: 0 };
      rotation = 0;
      scaling = { x: 1, y: 1 };
      shearing = { x: 0, y: 0 };
      draw();
    }

    // Dibujar inicialmente
    draw();