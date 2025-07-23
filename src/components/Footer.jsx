const Footer = () => {
  return (
    <footer className="footer flex justify-between p-10 bg-base-200 text-base-content mt-10">
      <aside>
        <p><strong>UrbanNest</strong><br />Find your dream property.</p>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Buy</a>
        <a className="link link-hover">Sell</a>
        <a className="link link-hover">Advertise</a>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <a className="link link-hover">Terms</a>
        <a className="link link-hover">Privacy</a>
      </nav>
    </footer>
  );
};

export default Footer;
