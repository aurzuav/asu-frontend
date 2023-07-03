import React from 'react'
import './aboutpage.css'
import Nav from '../common/Nav';
function AboutPage() {
    return (
      <>
      <Nav/>
        <div className="about-container">
            <h1 className='titulo'>About Us</h1>

          <div className='card'>
            <img src="../imgs/fotoagustin.jpeg" alt="" />
            <h3>Agustín Urzúa</h3>
            <p >Agustín es un apasionado del desarrollo web y la programación en general. Con experiencia en múltiples lenguajes de programación, se enfoca en construir soluciones escalables y robustas para problemas complejos. En su tiempo libre, le encanta tocar la guitarra y jugar videojuegos.</p>
          </div>
          <div className='card'>
            <img src="../imgs/fotocristobal.jpg" alt="" />
            <h3>Cristobal Severino</h3>
            <p >Cristóbal es una diseñador gráfico con habilidades en múltiples herramientas de diseño, desde Adobe Photoshop hasta Sketch. Siempre busca la manera de crear diseños únicos y creativos que ayuden a los usuarios a tener una mejor experiencia en línea. En su tiempo libre, disfruta de la lectura y el cine independiente.</p>
          </div>
        </div>
        </>
      );
    
}

export default AboutPage
