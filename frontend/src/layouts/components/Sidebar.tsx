import { Link, NavLink } from 'react-router-dom';
import images from '~/assets/images';
import router from '~/constants/routers';

import { sideBarLinks } from '~/constants/navlinks';

function Sidebar() {
  return (
    <div className="fixed left-0 flex flex-col h-full w-[300px] z-50 bg-white shadow-sidebar">
      <div className="relative flex items-center justify-between h-20 px-6 py-0 mb-3 min-h-20 after:content[''] after:w-[80%] after:absolute after:bg-[rgba(7,9,25,.1)] after:left-0 after:bottom-0 after:h-[1px] after:ml-[10%]">
        <Link to={router.dashboard.root} className="flex items-end gap-x-2">
          <div className="flex items-center w-10 h-10 rounded-full">
            <img src={images.logo} alt="logo" className="object-cover w-full h-full" />
          </div>
          <div className="transition-all leading-0">
            <b className="text-lg font-bold text-icon">Coffeeidential</b>
          </div>
        </Link>
      </div>
      <div className="h-full overflow-x-visible overflow-y-auto">
        <div className="relative h-full overflow-hidden">
          <div className="flex flex-col ">
            {sideBarLinks.map((item, index) => (
              <div key={index} className="px-3 mb-1">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 rounded gap-x-2 h-[44px] text-[15px] bg-opacity-0 transition-colors duration-[350ms] ${
                      isActive
                        ? 'bg-primary_gradient text-white shadow-success_hover'
                        : 'bg-transparent text-icon2 shadow-transparent'
                    } hover:text-white hover:shadow-success_hover hover:bg-primary_gradient`
                  }
                >
                  <span className="w-[28px] h-[28px] flex items-center justify-center text-[1.495rem]">
                    {item.icon}
                  </span>
                  <span className="font-semibold">{item.name}</span>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
