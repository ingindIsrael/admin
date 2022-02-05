import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider, useTheme, makeStyles } from '@material-ui/core/styles';
import Scrollbar from 'react-perfect-scrollbar';
import { renderRoutes } from 'react-router-config';
import AppContext from 'app/appContext';
import { MatxSuspense } from 'matx';
import clsx from 'clsx';
import Layout1Topbar from './Layout1Topbar';
import Layout1Sidenav from './Layout1Sidenav';
import Footer from '../SharedCompoents/Footer';

import SidenavTheme from '../MatxTheme/SidenavTheme/SidenavTheme';

const useStyles = makeStyles(({ palette, ...theme }) => ({
  contentWrap: ({ width }) => ({
    verticalAlign: 'top',
    marginLeft: width,
    transition: 'all 0.3s ease',
  }),
  topbar: {
    top: 0,
    zIndex: 96,
    background:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 44%, rgba(247, 247, 247, 0.4) 50%, rgba(255, 255, 255, 0))',
    transition: 'all 0.3s ease',
  },
}));

const Layout1 = () => {
  const { settings } = useSelector((state) => state.layout);
  const { layout1Settings } = settings;
  const {
    leftSidebar: { mode: sidenavMode, show: showSidenav },
  } = layout1Settings;
  const { routes } = useContext(AppContext);

  const getSidenavWidth = () => {
    switch (sidenavMode) {
      case 'full':
        return 'var(--sidenav-width)';
      case 'compact':
        return 'var(--sidenav-compact-width)';
      default:
        return '0px';
    }
  };

  const sidenavWidth = getSidenavWidth();
  const classes = useStyles({ width: sidenavWidth });
  const theme = useTheme();

  const topbarTheme = settings.themes[layout1Settings.topbar.theme];
  const layoutClasses = `theme-${theme.palette.type} flex`;

  return (
    <div className={clsx('bg-default', layoutClasses)}>
      {showSidenav && sidenavMode !== 'close' && (
        <SidenavTheme>
          <Layout1Sidenav />
        </SidenavTheme>
      )}

      <div
        className={clsx(
          'flex-grow flex-column relative overflow-hidden h-full-screen',
          classes.contentWrap,
        )}
      >
        {layout1Settings.topbar.show && layout1Settings.topbar.fixed && (
          <ThemeProvider theme={topbarTheme}>
            <Layout1Topbar fixed className="elevation-z8" />
          </ThemeProvider>
        )}

        {settings.perfectScrollbar && (
          <Scrollbar className="flex-grow flex-column relative h-full">
            {layout1Settings.topbar.show && !layout1Settings.topbar.fixed && (
              <ThemeProvider theme={topbarTheme}>
                <Layout1Topbar />
              </ThemeProvider>
            )}
            <div className="relative flex-grow">
              <MatxSuspense loadbar>{renderRoutes(routes)}</MatxSuspense>
            </div>
            {settings.footer.show && !settings.footer.fixed && <Footer />}
          </Scrollbar>
        )}

        {!settings.perfectScrollbar && (
          <div className="flex-grow flex-column relative h-full scroll-y">
            {layout1Settings.topbar.show && !layout1Settings.topbar.fixed && (
              <ThemeProvider theme={topbarTheme}>
                <Layout1Topbar />
              </ThemeProvider>
            )}
            <div className="relative flex-grow">
              <MatxSuspense loadbar>{renderRoutes(routes)}</MatxSuspense>
            </div>
            {settings.footer.show && !settings.footer.fixed && <Footer />}
          </div>
        )}

        {settings.footer.show && settings.footer.fixed && <Footer />}
      </div>
    </div>
  );
};

export default Layout1;
