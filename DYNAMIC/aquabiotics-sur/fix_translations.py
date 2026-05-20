import json
import os

es_path = r'c:\Users\VN\WEB-AQUA\DYNAMIC\aquabiotics-sur\src\locales\es\translation.json'
en_path = r'c:\Users\VN\WEB-AQUA\DYNAMIC\aquabiotics-sur\src\locales\en\translation.json'

with open(es_path, 'r', encoding='utf-8') as f:
    es = json.load(f)

es['about_blurb'] = es['about_blurb'].replace('transformamos', 'transforma')
es['solution']['process_title'] = 'El proceso permite:'
es['updates']['subtitle'] = 'Un recorrido por la biotecnología marina y la economía circular escalando el impacto.'
es['about_page']['who_we_are'] = 'La Empresa'
es['about_page']['our_journey'] = 'Trayectoria'
es['about_page']['values'][0]['desc'] = 'Se eliminan los residuos y se mantienen los materiales en uso.'
es['about_page']['origins_title'] = 'Orígenes'
es['about_page']['origins_p1'] = es['about_page']['origins_p1'].replace('Reconocimos', 'Se reconoció')
es['about_page']['origins_p2'] = es['about_page']['origins_p2'].replace('No vimos esto', 'Esto no se vio').replace('Nuestro equipo de biólogos e ingenieros se unió', 'El equipo de biólogos e ingenieros se unió')
es['about_page']['cards'][0]['desc'] = es['about_page']['cards'][0]['desc'].replace('nuestras costas', 'las costas')
es['about_page']['team_title'] = 'El Equipo'
es['about_page']['brand_quote_1'] = es['about_page']['brand_quote_1'].replace('No somos una empresa de tratamiento de residuos. Somos una empresa', 'No es una empresa de tratamiento de residuos. Es una empresa')
es['sustainability_page']['circular_economy'] = 'Modelo Circular'
es['sustainability_page']['sdg_groups'][0]['items'][4]['targets'][0] = es['sustainability_page']['sdg_groups'][0]['items'][4]['targets'][0].replace('nuestras estrategias', 'las estrategias')
es['technology_page']['quality_desc'] = 'El proceso asegura los más altos estándares de pureza y trazabilidad, alineados con las normativas internacionales de seguridad alimentaria. Al mantener una línea de biorrefinería controlada de principio a fin, se garantiza un ingrediente de primera calidad para las aplicaciones más exigentes.'
es['technology_page']['innov_desc'] = 'Se optimizan continuamente los métodos de separación selectiva, combinando biotecnología con ingeniería de procesos avanzada. Esto permite escalar eficientemente mientras se maximizan las tasas de recuperación de metabolitos marinos endógenos que de otro modo se perderían.'
es['technology_page']['innovation_nextgen']['subtitle'] = 'AquaBiotics Sur es pionera en el uso de suprareciclaje molecular dirigido combinado con ingeniería de bioprocesos avanzada para construir un modelo de biorrefinería circular real.'
es['technology_page']['innovation_nextgen']['ip_strategy_desc'] = 'Descarga el resumen ejecutivo para conocer en detalle la propuesta de valor, el modelo de negocio y la tracción en el desarrollo de ingredientes marinos upcycled.'
es['technology_page']['innovation_cards'][1]['items'][0]['desc'] = 'Formulación del concepto tecnológico. Se tiene identificada la fuente (agua de cocción de choritos) y el proceso teórico (biorrefinería), pero falta la evidencia experimental de que los compuestos de interés se pueden extraer con la pureza y eficiencia necesarias.'
es['technology_page']['innovation_cards'][1]['items'][1]['desc'] = 'Hipótesis de mercado. Se ha identificado una oportunidad en la economía circular y los nutracéuticos, pero aún no se ha validado con "dolores" reales de potenciales compradores o procesadoras de moluscos.'
es['technology_page']['innovation_cards'][1]['items'][2]['desc'] = 'Plan de negocios inicial. Se cuenta con una visión clara, un equipo potencial identificado y el proyecto se encuentra postulando a programas de aceleración, lo cual es el primer paso administrativo firme.'
es['technology_page']['quality_cards'][1]['desc'] = 'Las operaciones se adhieren a los estándares internacionales de Gestión de Calidad, incluyendo BPM y BPL, garantizando la seguridad para aplicaciones alimenticias.'
es['updates_new']['u1_exc'] = 'Se ha integrado con éxito la tecnología propia de separación selectiva en la línea principal de proceso, mejorando las tasas de recuperación.'
es['updates_new']['u2_exc'] = 'Profundizando el compromiso con el impacto territorial en el sur de Chile a través de nuevas asociaciones operativas.'
es['updates_new']['u3_exc'] = 'Explicando la filosofía central: por qué la taurina natural a partir del caldo de cocción es la clave.'
es['privacy_page']['sections'][0]['content'] = 'Aquabiotics Sur está comprometida a proteger la privacidad y garantizar la seguridad de la información técnica. Esta política describe cómo se recopilan y utilizan los datos técnicos para mejorar la plataforma de "Economía Circular Azul".'
es['privacy_page']['sections'][1]['content'] = es['privacy_page']['sections'][1]['content'].replace('Utilizamos', 'Se utiliza')
es['privacy_page']['sections'][2]['content'] = 'Los datos se utilizan exclusivamente para análisis estadísticos e informes internos con el fin de optimizar el contenido técnico, mejorar el rendimiento del sitio y comprender mejor el interés del mercado global en la biotecnología marina.'
es['privacy_page']['sections'][3]['content'] = 'Esta política está diseñada para cumplir con la Ley Chilena N° 19.628 sobre la Protección de la Vida Privada. No se venden, alquilan ni comparten datos personales con terceros para fines de marketing.'
es['privacy_page']['sections'][4]['content'] = 'El sitio utiliza cookies estrictamente para la funcionalidad de Google Analytics. Puede optar por desactivar las cookies en la configuración de su navegador si desea excluirse de este seguimiento.'
es['privacy_page']['sections'][5]['content'] = 'Si existe alguna pregunta sobre esta política de privacidad, puede utilizar la Página de Contacto oficial.'
es['contact_page']['hero_subtitle'] = 'Colaborando por un futuro más sostenible.'
es['contact_page']['hero_sub'] = 'Colaborando por un futuro más sostenible.'
es['contact_page']['contact_desc'] = 'Se invita a socios potenciales, inversores o clientes a establecer comunicación para conversar sobre posibles colaboraciones.'
es['contact_page']['email_us'] = 'Enviar Correo'
es['contact_page']['form']['name_ph'] = 'Nombre'
es['contact_page']['form']['email_ph'] = 'correo@email.com'
es['contact_page']['form']['message_ph'] = 'Motivo del mensaje'
es['contact_page']['form']['success'] = '✅ ¡Mensaje enviado con éxito! Se responderá a la brevedad.'

with open(es_path, 'w', encoding='utf-8') as f:
    json.dump(es, f, indent=4, ensure_ascii=False)


with open(en_path, 'r', encoding='utf-8') as f:
    en = json.load(f)

en['about_blurb'] = en['about_blurb'].replace('we transform', 'it transforms')
en['solution']['process_title'] = 'The process enables:'
en['updates']['subtitle'] = 'Following the journey in marine biotechnology and circular economy milestones while scaling the impact.'
en['about_page']['who_we_are'] = 'About the Company'
en['about_page']['our_journey'] = 'The Journey'
en['about_page']['values'][0]['desc'] = 'Waste is designed out and materials are kept in use.'
en['about_page']['origins_title'] = 'Origins'
en['about_page']['origins_p1'] = en['about_page']['origins_p1'].replace('We recognized', 'A paradox was recognized: while the mussel industry is a major economic driver, it also generates')
en['about_page']['origins_p2'] = en['about_page']['origins_p2'].replace('We saw this', 'This was seen').replace('Our team of biologists and engineers came together', 'The team of biologists and engineers came together')
en['about_page']['cards'][0]['desc'] = en['about_page']['cards'][0]['desc'].replace('our coasts', 'the coasts')
en['about_page']['team_title'] = 'The Team'
en['about_page']['brand_quote_1'] = en['about_page']['brand_quote_1'].replace('We are not a waste treatment company. We are a company', 'It is not a waste treatment company. It is a company')
en['sustainability_page']['circular_economy'] = 'Circular Model'
en['technology_page']['quality_desc'] = 'The process ensures the highest standards of purity and traceability, aligned with international food safety regulations. By maintaining an end-to-end controlled biorefinery line, a premium ingredient is guaranteed for the most demanding functional food and nutraceutical applications.'
en['technology_page']['innov_desc'] = 'The selective separation methods are continuously optimized, combining biotechnology with advanced process engineering. This allows for efficient scale-up while maximizing the recovery rates of endogenous marine metabolites that would otherwise be lost.'
en['technology_page']['innovation_nextgen']['subtitle'] = 'AquaBiotics Sur is pioneering the use of targeted molecular upcycling combined with advanced bioprocess engineering to build a true circular biorefinery model.'
en['technology_page']['innovation_nextgen']['ip_strategy_desc'] = 'Download the executive summary to learn in detail about the value proposition, business model, and traction in the development of upcycled marine ingredients.'
en['technology_page']['quality_cards'][1]['desc'] = 'The operations adhere to international Quality Management standards, including GMP and GLP, ensuring safety for food applications.'
en['updates_new']['u1_exc'] = 'The proprietary selective separation technology has been successfully integrated into the main processing line.'
en['updates_new']['u2_exc'] = 'Deepening the commitment to the territorial impact in Southern Chile through new operational partnerships.'
en['updates_new']['u3_exc'] = 'Explaining the core philosophy: why natural taurine from cooking broth is the key to a sustainable market.'
en['privacy_page']['sections'][0]['content'] = 'Aquabiotics Sur is committed to protecting privacy and ensuring the security of technical information. This policy outlines how technical data is collected and used to improve the "Blue Circular Economy" platform.'
en['privacy_page']['sections'][1]['content'] = 'Google Analytics 4 (GA4) is used to understand how users interact with the website. Information collected includes:'
en['privacy_page']['sections'][2]['content'] = 'Data is used exclusively for statistical analysis and internal reporting to optimize the technical content, improve site performance, and better understand global market interest in marine biotechnology.'
en['privacy_page']['sections'][3]['content'] = 'This policy is designed to comply with Chilean Law No. 19.628 on the Protection of Private Life. Personal data is not sold, rented, or shared with third parties for marketing purposes.'
en['privacy_page']['sections'][4]['content'] = 'The site uses cookies strictly for Google Analytics functionality. This tracking can be opted out of by disabling cookies in the browser settings.'
en['privacy_page']['sections'][5]['content'] = 'If there are any questions regarding this privacy policy, please reach out via the official Contact Page.'
en['contact_page']['hero_subtitle'] = 'Collaborating for a more sustainable future.'
en['contact_page']['hero_sub'] = 'Collaborating for a more sustainable future.'
en['contact_page']['contact_desc'] = 'Potential partners, investors, or customers are encouraged to reach out to discuss collaboration opportunities.'
en['contact_page']['email_us'] = 'Email Contact'
en['contact_page']['form']['name_ph'] = 'Name'
en['contact_page']['form']['email_ph'] = 'email@example.com'
en['contact_page']['form']['message_ph'] = 'Reason for message'
en['contact_page']['form']['success'] = '✅ Message sent successfully! A response will be sent shortly.'

with open(en_path, 'w', encoding='utf-8') as f:
    json.dump(en, f, indent=4, ensure_ascii=False)

print('Success')
