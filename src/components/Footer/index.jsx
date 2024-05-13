import { Link } from 'react-router-dom';
import './styles.scss';

function Footer() {
  return (
    <div id="footer">
      <p>@2024 - Todos os direitos reservados • <Link to="/Admin">Administração</Link></p>

      <ul>
        <li>RM552980 Danilo Vieira</li>
        <li>RM553377 Enzo Rodrigues</li>
        <li>RM552939 Jonata Rafael</li>
        <li>RM553403 Matheus Felippe</li>
        <li>RM553521 Rafael Cristofali</li>
      </ul>
    </div>
  )
}

export default Footer