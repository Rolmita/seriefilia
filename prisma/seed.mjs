import { PrismaClient } from '@prisma/client'

// DECLARACIÓN DE DATOS
const series = [
    {
        nombre: 'Game Of Thrones',
        temporadas: 8,
        estado: 'Finalizada',
        inicio: '2011',
        final: '2019',
    },
    {
        nombre: 'Vikings',
        temporadas: 6,
        estado: 'Finalizada',
        inicio: '2013',
        final: '2020',
    },
    {
        nombre: 'Stranger Things',
        temporadas: 4,
        estado: 'En emisión',
        inicio: '2016',
    },
    {
        nombre: 'Shameless',
        temporadas: 11,
        estado: 'Finalizada',
        inicio: '2011',
        final: '2021',
    },
    {
        nombre: 'The Bear',
        temporadas: 2,
        estado: 'En emisión',
        inicio: '2022',
    },
]

const posts = [
    {
        nombre: 'Juego de tronos temporada 1: Análisis',
        serieId: 1,
        descripcion: `La primera temporada de "Juego de Tronos", basada en la serie de novelas "Canción de Hielo y Fuego" de George R.R. Martin, establece el escenario para el mundo complejo y lleno de intrigas de Poniente. Aquí tienes un análisis general de la temporada:
        La temporada presenta a los principales personajes de las diversas casas nobles de Poniente, como los Stark, Lannister, Baratheon y Targaryen, junto con otros personajes clave como Jon Snow, Daenerys Targaryen, y Tyrion Lannister. Cada casa tiene sus propias ambiciones y conflictos internos, y la temporada establece las relaciones entre estos personajes.
        Gran parte de la temporada se centra en las luchas de poder entre las diferentes casas nobles, especialmente entre los Stark y los Lannister, con el Trono de Hierro como premio deseado. Las alianzas cambian constantemente, y los personajes deben enfrentarse a traiciones, conspiraciones y juegos de poder.
        La serie presenta una gama de personajes complejos y multifacéticos, cada uno con sus propias motivaciones, miedos y deseos. A través de sus interacciones, se exploran temas como el honor, la lealtad, la venganza y la redención.
        La temporada aborda una variedad de temas, incluyendo la naturaleza del poder y la corrupción, los conflictos familiares, el deber y la responsabilidad, así como las consecuencias imprevistas de las acciones humanas.
        La serie se hace conocida por sus sorpresivas muertes y giros argumentales impactantes. La primera temporada establece este tono al matar a personajes importantes y presentar situaciones impredecibles, lo que mantiene a la audiencia en vilo.
        La temporada introduce al espectador al vasto mundo de Poniente, con sus diferentes regiones, culturas y religiones. Además, se insinúan misterios antiguos, como los Caminantes Blancos, que serán importantes en temporadas posteriores.
        En resumen, la primera temporada de "Juego de Tronos" establece un mundo complejo lleno de personajes intrigantes, tramas políticas y temas profundos, todo ello mientras mantiene al espectador enganchado con giros argumentales impactantes y un mundo rico en detalles.`,
    },
    {
        nombre: 'Vikingos: Análisis de la serie.',
        serieId: 2,
        descripcion: `"Vikingos" es una serie de televisión histórica creada por Michael Hirst que se centra en las legendarias figuras vikingas y en las incursiones de los nórdicos en Europa durante la Era Vikinga. Aquí tienes un análisis general de la serie:
        La serie ofrece una mirada detallada a la vida y costumbres de los vikingos, incluyendo su sociedad, religión, tradiciones guerreras y exploraciones marítimas. Se muestra cómo los vikingos vivían en comunidades agrícolas, pero también eran hábiles navegantes y guerreros.
        "Vikingos" presenta una variedad de personajes complejos y multifacéticos, desde el legendario Ragnar Lothbrok hasta otros líderes vikingos como Lagertha, Bjorn Ironside, y Rollo. A lo largo de la serie, se exploran los conflictos internos de estos personajes, así como sus relaciones con otros líderes y con sus propias comunidades.
        La serie aborda una variedad de temas, incluyendo el poder, la ambición, la lealtad, la traición, la religión y el destino. Se exploran las tensiones entre el deseo de poder y la responsabilidad hacia la comunidad, así como las consecuencias de las acciones de los personajes.
        "Vikingos" está repleta de emocionantes escenas de batalla y acción, que muestran las tácticas de guerra vikingas y la brutalidad de los enfrentamientos cuerpo a cuerpo. Estas secuencias ayudan a dar vida a la intensidad y ferocidad de la época vikinga.
        La serie cuenta con una producción visual impresionante, que recrea fielmente los paisajes nórdicos y europeos de la época vikinga, así como los asentamientos vikingos y las estructuras arquitectónicas. Esto ayuda a sumergir al espectador en el mundo de los vikingos.
        Aunque la serie toma algunas licencias creativas, está inspirada en eventos históricos y figuras legendarias de la Era Vikinga, así como en la mitología nórdica. Se entrelazan elementos de la historia con elementos fantásticos y míticos, lo que añade un toque de misterio y aventura a la trama.
        En resumen, "Vikingos" es una serie que ofrece una representación cautivadora de la cultura y la historia vikinga, con personajes complejos, temas profundos y emocionantes escenas de acción, todo ello ambientado en un impresionante telón de fondo visual.`,
    },
    {
        nombre: 'Stranger Things: Análisis de la temporada 3.',
        serieId: 3,
        descripcion: `La tercera temporada continúa desarrollando a los personajes principales, como Eleven, Mike, Dustin, Lucas, Will y sus familiares y amigos. Los personajes enfrentan nuevos desafíos y experimentan crecimiento personal a medida que la trama avanza.
        La temporada introduce nuevas amenazas y misterios, incluyendo la llegada de un centro comercial que altera la dinámica de la ciudad, así como una conspiración secreta que involucra a los rusos y a un nuevo enemigo del Otro Lado.
        La serie sigue explorando el tema de la amistad y el compañerismo entre los protagonistas, así como los desafíos de la adolescencia. Cada personaje enfrenta sus propios obstáculos y aprende lecciones importantes sobre la vida y la madurez.
        Al igual que en las temporadas anteriores, la tercera temporada está impregnada de referencias culturales de los años 80, desde la música hasta la moda y las películas. Esto ayuda a establecer la atmósfera y el tono nostálgico de la serie.
        La temporada está llena de emocionantes escenas de acción y suspenso, con enfrentamientos contra criaturas del Otro Lado y momentos de peligro que mantienen a los espectadores en vilo.
        La temporada culmina en un desenlace emocional que ofrece cierres satisfactorios para algunas tramas mientras deja otras abiertas para futuras temporadas. Se exploran temas de sacrificio, valentía y amor entre los personajes.
        En general, la tercera temporada de "Stranger Things" ofrece una continuación emocionante y satisfactoria de la historia, con nuevos giros y emociones que mantienen a los espectadores enganchados hasta el final.`,
    },
    {
        nombre: 'Shameless: Análisis de la temporada 11',
        serieId: 4,
        descripcion: `La undécima temporada de "Shameless" marca el final de una serie que ha sido aclamada por su retrato crudo y a menudo humorístico de la vida en una familia disfuncional de clase trabajadora en Chicago. 
        La temporada final continúa explorando los altibajos de los Gallagher y sus amigos cercanos, enfrentándolos a nuevos desafíos y oportunidades para el crecimiento personal. 
        Con el paso del tiempo, vemos cómo los personajes principales, especialmente Fiona (interpretada por Emmy Rossum) y Frank (interpretado por William H. Macy), han evolucionado y enfrentan las consecuencias de sus acciones pasadas.
        La temporada ofrece un cierre emocional para muchos de los arcos de los personajes, así como para la familia Gallagher en su conjunto, con un final que honra el legado de la serie y deja a los espectadores con un sentido de conclusión satisfactorio.
        En resumen, "Shameless" es una serie que ha sido elogiada por su autenticidad, su humor negro y sus actuaciones sólidas, especialmente la de William H. Macy como Frank Gallagher. A lo largo de sus once temporadas, la serie ha mantenido una base de seguidores leales y ha dejado una marca duradera en la televisión contemporánea como un retrato honesto y a veces provocativo de la lucha de una familia para sobrevivir en circunstancias difíciles.`,
    },
    {
        nombre: 'The Bear: análisis de la temporada 1',
        serieId: 5,
        descripcion: `Después de una brillante carrera como chef en uno de los mejores restaurantes del mundo, Carmy regresa a Chicago, su ciudad, para tratar de reflotar el desastroso restaurante de su hermano Mike, después de que este decidiera poner fin a su vida.
        La ficción ha explotado no pocas veces al chef como personaje, normalmente en clave de comedia (Julie y Julia) , o de comedia romántica (Deliciosa Martha, Bon appétit), incluso en algunas ocasiones con un arco más dramático (El cocinero de los últimos deseos). 
        Desde el ángulo de la novedad temática, The Bear no aporta realmente demasiado y, sin embargo, es un producto que funciona muy bien gracias a la excelente creación de personajes. La disfuncional familia que forma la plantilla de The Original Beef of Chicagoland, está compuesta por un grupo de losers que se conocen perfectamente, y aprenden a trabajar y convivir juntos.
        Uno de los aspectos más valiosos del planteamiento es la transformación que los personajes experimentan gracias al trabajo bien hecho. Es curioso como la primera palanca del cambio la genera un pequeño detalle: el tratamiento de chef que Carmy y su ayudante Syd implantan como forma de dirigirse unos a otros mientras cocinan; a partir de ahí, poco a poco, el orden se abre paso en el caos. 
        La acción progresa combinando el conflicto externo común con la interioridad de cada personaje. Carmy (estupendo Jeremy Allen, ganador de un Globo de Oro por este trabajo), es un cocinero estresado, pero también un tipo con problemas de ansiedad que está viviendo el duelo por el suicidio de su hermano.  Syd es una joven promesa de la cocina con talento de líder, que se ha estancado en su desarrollo, etc. El espectador va descubriendo las motivaciones intrínsecas de todos y alcanzando la empatía que se busca.
        En cuanto a la realización, tenemos una cámara rápida y violenta (a veces algo excesiva), que quiere subrayar el caos, una buena puesta en escena y una banda sonora bien escogida. El final resulta bastante formulario y algo edulcorado, pero deja buen sabor de boca y abre la puerta a la segunda temporada que se estrenará próximamente en Disney.`,
    },

];


// INSERCIÓN DE DATOS
const prisma = new PrismaClient();

const load = async () => {
    try {
        await prisma.serie.deleteMany({});
        console.log('Borrados los registros de la tabla series');
        await prisma.post.deleteMany({});
        console.log('Borrados los registros de la tabla posts');

        // await prisma.$queryRaw`ALTER SEQUENCE articulos_id_seq RESTART WITH 1`;
        // console.log('reset articulo sequence to 1');

        await prisma.serie.createMany({
            data: series,
        });
        console.log('Añadidos datos a tabla series');

        await prisma.post.createMany({
            data: posts,
        });
        console.log('Añadidos datos a tabla posts');

    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

load();