import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <div className="CustomBg_CustomBg__mpBxm">
        <div className="CustomBg_bg_gradient__9nROB">
          <div className="GradientCircle_GradientCircle__mH3g6 bg_primary gradient_circle" style={{opacity: 1}}></div>
        </div>
        <div className="CustomBg_bg_image__RIwVy">
          <div>
            <Navbar />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
