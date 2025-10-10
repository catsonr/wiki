let ex1_a = [-0.3,-0.5,-0.9,0.9,0.8,-0.6,-0.1,0.9,-0.6, -0.3, -0.7, 0.9];

let ex1_points = attractorGenerateVerticies(ex1_a, [0, 0], 9);

const ex1_slider = document.getElementById('ex1_slider');
const ex1_sliderValue = document.getElementById('ex1_slidervalue');
const ex1_size = [400, 400];

let ex1_pointCount = 1;
shaderDrawAttractorToCanvas('canvas_ex1', ex1_points.slice(0, ex1_pointCount * 2), ex1_size, 5, true);

ex1_slider.addEventListener('input', () => {
    ex1_sliderValue.textContent = ex1_slider.value;
    ex1_pointCount = ex1_slider.value;

    shaderDrawAttractorToCanvas('canvas_ex1', ex1_points.slice(0, ex1_pointCount * 2), ex1_size, 5, true);
});

let ex2_points = attractorFindAttractor();
const ex2_size = [800, 800];
shaderDrawAttractorToCanvas('canvas_ex2', ex2_points, ex2_size, 0.1, false);

const ex2_button = document.getElementById('ex2_button');
ex2_button.addEventListener('click', () => {
    ex2_points = attractorFindAttractor();
    shaderDrawAttractorToCanvas('canvas_ex2', ex2_points, ex2_size, 0.1, false);
});