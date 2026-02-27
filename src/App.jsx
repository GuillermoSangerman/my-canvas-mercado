import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [draggedCard, setDraggedCard] = useState(null)
  const [placedCards, setPlacedCards] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)

  // 9 elementos del Business Model Canvas
  const allCards = [
    {
      id: 1,
      title: 'SOCIOS CLAVE',
      description: [
        'Agricultores y artesanos locales.',
        'Cooperativas comunitarias.',
        'Instituciones educativas y culturales.',
        ' Organizaciones gubernamentales y ONG de desarrollo rural.',
        'Empresas de tecnología solar y movilidad eléctrica.',
      ],
      color: '#B8E6E9',
      position: 'socios'
    },
    {
      id: 2,
      title: 'ACTIVIDADES CLAVE',
      description: [
        'Planificación de rutas en conjunto con las comunidades.',
        'Distribución de alimentos, productos básicos y artesanías.',
        'Organización de talleres culturales, educativos y de salud.',
        'Mantenimiento del vehículo y de los sistemas solares.',
        'Gestión financiera y operativa para asegurar sostenibilidad.',
      ],
      color: '#B8E6E9',
      position: 'actividades'
    },
    {
      id: 3,
      title: 'PROPUESTA DE VALOR',
      description: [
        'El Mercado Móvil Solar ofrece acceso directo y sostenible a alimentos frescos, productos básicos, artesanías locales y artículos de primeros auxilios en comunidades rurales de Oaxaca. Su diseño futurista transmite confianza y modernidad, mientras que su funcionamiento con energía solar garantiza autonomía y respeto al medio ambiente. Además, cada visita se convierte en un espacio de encuentro cultural y educativo, fortaleciendo la cohesión comunitaria.',
      ],
      color: '#fcab4f',
      position: 'propuesta'
    },
    {
      id: 4,
      title: 'RELACIÓN CON CLIENTES',
      description: [
        'Participación activa de la comunidad en la planificación de rutas y actividades.',
        'Experiencia de compra cercana, segura y digna.',
        'Espacios de interacción cultural y educativa que fortalecen vínculos sociales.',
        'Transparencia en precios y procesos para generar confianza.',
      ],
      color: '#B8E6E9',
      position: 'relacion'
    },
    {
      id: 5,
      title: 'SEGMENTOS DE CLIENTES',
      description: [
        'Familias en comunidades rurales con acceso limitado a bienes básicos.',
        'Agricultores y artesanos locales que buscan canales de distribución directos.',
        'Instituciones educativas y culturales interesadas en promover talleres comunitarios.',
        'Organizaciones gubernamentales y ONG enfocadas en desarrollo rural y sostenibilidad.'
      ],
      color: '#fcab4f',
      position: 'segmentos'
    },
    {
      id: 6,
      title: 'RECURSOS CLAVE',
      description: [
        'Vehículo eléctrico futurista con paneles solares.',
        'Estanterías modulares y equipamiento para almacenamiento seguro.',
        'Personal capacitado en logística, atención comunitaria y primeros auxilios.',
        'Alianzas con productores locales y artesanos.',
        'Infraestructura tecnológica básica para coordinar rutas y pagos.',
      ],
      color: '#B8E6E9',
      position: 'recursos'
    },
    {
      id: 7,
      title: 'CANALES',
      description: [
        'Vehículo móvil que recorre rutas comunitarias previamente definidas.',
        'Asambleas locales para coordinar horarios y necesidades.',
        'Comunicación digital básica (mensajes comunitarios, radios locales, carteles).',
        'Alianzas con cooperativas y centros comunitarios para difundir información.',
      ],
      color: '#C4D96F',
      position: 'canales'
    },
    {
      id: 8,
      title: 'FUENTES DE INGRESOS',
      description: [
        'Venta directa de alimentos frescos y productos básicos.',
        'Comercialización de artesanías locales.',
        'Servicios complementarios (talleres culturales, educativos o de salud).',
        'Posibles subsidios o apoyos de programas de desarrollo rural y sostenibilidad.',
      ],
      color: '#C4D96F',
      position: 'ingresos'
    },
    {
      id: 9,
      title: 'ESTRUCTURA DE COSTES',
      description: [
        'Inversión inicial en el vehículo eléctrico y paneles solares.',
        'Mantenimiento y operación del vehículo.',
        'Sueldos del personal encargado de logística y atención comunitaria.',
        'Costos de adquisición de productos básicos y artesanías.',
        'Gastos de organización de talleres y actividades complementarias.',
        'Comunicación y coordinación comunitaria.',
      ],
      color: '#C4D96F',
      position: 'costes'
    },
  ]

  const dragStart = (e, card) => {
    setDraggedCard(card)
    e.dataTransfer.effectAllowed = 'move'
  }

  const dragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const dropInPosition = (e, position) => {
    e.preventDefault()
    if (draggedCard) {
      const newPlacedCards = { ...placedCards }
      newPlacedCards[position] = draggedCard
      setPlacedCards(newPlacedCards)
      setDraggedCard(null)
    }
  }

  const removeRandomCard = () => {
    const placedPositions = Object.keys(placedCards)
    if (placedPositions.length > 0) {
      const randomPosition = placedPositions[Math.floor(Math.random() * placedPositions.length)]
      removeCard(randomPosition)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const removeCard = (position) => {
    const newPlacedCards = { ...placedCards }
    delete newPlacedCards[position]
    setPlacedCards(newPlacedCards)
  }

  const availableCards = allCards.filter(card => !Object.values(placedCards).find(p => p.id === card.id))
  const isComplete = allCards.length === Object.keys(placedCards).length

  const renderCanvasCard = (position, card) => {
    if (card) {
      return (
        <div
          className="placed-card"
          style={{ backgroundColor: card.color }}
        >
          <div className="card-header-placed">
            <h3>{card.title}</h3>
            <button
              className="remove-btn"
              onClick={() => removeCard(position)}
              title="Quitar tarjeta"
            >
              ✕
            </button>
          </div>
          {Array.isArray(card.description) ? (
            <ul className="card-list">
              {card.description.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{card.description}</p>
          )}
        </div>
      )
    }
    return (
      <div className="empty-cell">
        <span className="cell-placeholder">+</span>
      </div>
    )
  }

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        setIsModalOpen(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isComplete])

  return (
    <div className="app-wrapper">
      <div className="canvas-container">
        <div className="canvas-header">
          <h1>Modelo Canvas – Mercado Móvil Solar</h1>
        </div>

        {/* Sección de tarjetas disponibles */}
        <div className="available-cards-section">
          <div className="available-cards-header">
            <h2>Tarjetas Disponibles ({availableCards.length}/{allCards.length})</h2>
            {isComplete && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="reopen-modal-btn"
              >
                📋 Ver Resumen
              </button>
            )}
          </div>
          <div className="available-cards-grid">
            {availableCards.map(card => (
              <div
                key={card.id}
                className="draggable-card"
                draggable
                onDragStart={(e) => dragStart(e, card)}
                style={{ backgroundColor: card.color }}
              >
                <h3>{card.title}</h3>
                <span className="drag-hint">↕ Arrastra</span>
              </div>
            ))}
          </div>
        </div>

        {/* Zona de colocación - Canvas 9 puntos */}
        <div className="canvas-drop-zone">
          <p className='mb-2'>Arrastra las tarjetas para organizar tu modelo de negocio</p>
          <div className="canvas-grid-9">

            {/* COLUMNA 1: SOCIOS CLAVE (Vertical - 2 espacios) */}
            <div
              className="canvas-position col1-vertical"
              onDragOver={dragOver}
              onDrop={(e) => dropInPosition(e, 'socios')}
            >
              {renderCanvasCard('socios', placedCards['socios'])}
            </div>

            {/* COLUMNA 2: ACTIVIDADES CLAVE y RECURSOS CLAVE (2 elementos) */}
            <div
              className="canvas-position col2-top"
              onDragOver={dragOver}
              onDrop={(e) => dropInPosition(e, 'actividades')}
            >
              {renderCanvasCard('actividades', placedCards['actividades'])}
            </div>

            <div
              className="canvas-position col2-bottom"
              onDragOver={dragOver}
              onDrop={(e) => dropInPosition(e, 'recursos')}
            >
              {renderCanvasCard('recursos', placedCards['recursos'])}
            </div>

            {/* COLUMNA 3: PROPUESTA DE VALOR (Vertical - 2 espacios - VERDE) */}
            <div
              className="canvas-position col3-vertical center-item"
              onDragOver={dragOver}
              onDrop={(e) => dropInPosition(e, 'propuesta')}
            >
              {renderCanvasCard('propuesta', placedCards['propuesta'])}
            </div>

            {/* COLUMNA 4: RELACIÓN y CANALES (2 elementos) */}
            <div
              className="canvas-position col4-top"
              onDragOver={dragOver}
              onDrop={(e) => dropInPosition(e, 'relacion')}
            >
              {renderCanvasCard('relacion', placedCards['relacion'])}
            </div>

            <div
              className="canvas-position col4-bottom"
              onDragOver={dragOver}
              onDrop={(e) => dropInPosition(e, 'canales')}
            >
              {renderCanvasCard('canales', placedCards['canales'])}
            </div>

            {/* COLUMNA 5: SEGMENTOS DE CLIENTES (Vertical - 2 espacios) */}
            <div
              className="canvas-position col5-vertical"
              onDragOver={dragOver}
              onDrop={(e) => dropInPosition(e, 'segmentos')}
            >
              {renderCanvasCard('segmentos', placedCards['segmentos'])}
            </div>

            {/* FILA INFERIOR: FUENTES DE INGRESOS y ESTRUCTURA DE COSTES */}
            <div
              className="canvas-position row-bottom-left"
              onDragOver={dragOver}
              onDrop={(e) => dropInPosition(e, 'ingresos')}
            >
              {renderCanvasCard('ingresos', placedCards['ingresos'])}
            </div>

            <div
              className="canvas-position row-bottom-right"
              onDragOver={dragOver}
              onDrop={(e) => dropInPosition(e, 'costes')}
            >
              {renderCanvasCard('costes', placedCards['costes'])}
            </div>
          </div>
        </div>

        {/* Estado de completitud */}
        {!isComplete && (
          <div className="completion-indicator">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(Object.keys(placedCards).length / allCards.length) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
      {/* Modal Overlay */}
      {(isModalOpen) && <div className="modal-overlay" onClick={closeModal}></div>}

      {/* Modal */}
      <div id="modal-complete" tabIndex="-1" className={`modal-container ${(isModalOpen) ? 'modal-open' : ''}`}>
        <div className="modal-content">
          {/* Close Button */}
          <button
            className="modal-close-btn"
            onClick={(e) => {
              e.stopPropagation()
              closeModal()
            }}
            title="Cerrar"
          >
            ✕
          </button>

          {/* Modal Header */}
          <div className="modal-header">
            <h2>¡Felicidades!</h2>
            <p>Lo haz completado</p>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            <p>
              Mi prototipo del Mercado Móvil Solar representa una respuesta concreta y sensible a las necesidades que enfrentan muchas comunidades rurales de Oaxaca. Al imaginar un vehículo que no solo distribuye productos esenciales, sino que también funciona con energía limpia y se convierte en un espacio de encuentro cultural, siento que estoy proponiendo algo más que una solución logística: estoy planteando una forma de fortalecer la identidad, la autonomía y la dignidad comunitaria. Este proyecto me ha permitido reflexionar sobre cómo la tecnología puede adaptarse al territorio y cómo el diseño puede ser inclusivo, funcional y profundamente humano.
            </p>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button
              onClick={(e) => {
                e.stopPropagation()
                closeModal()
              }}
              className="modal-btn-primary"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
      
      {/* Hecho por */}
      <div className="hecho-indicator">
        Hecho por: Guillermo Sangerman ❤️
      </div>
    </div>
  )
}

export default App
