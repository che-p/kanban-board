import "./footer.css";

function Footer(props) {
  const { footerData } = props;
  return (
    <footer className="footer container">
      <div className="footer__tasks">
        <span className="footer__task">Active tasks: {footerData.aTasks}</span>
        <span className="footer__task">
          Finished tasks: {footerData.fTasks}
        </span>
      </div>
      <div className="footer__credits">
        <span>
          Kanban board by {footerData.nameFoo}, {footerData.yearFoo}
        </span>
      </div>
    </footer>
  );
}

export default Footer;
