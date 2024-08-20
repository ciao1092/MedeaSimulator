import AppIcon from "./AppIcon";
import AppIconContainer from "./AppIconContainer";

type AppList = Array<{ text: string; icon?: any }>;

const AppIconRow = (props: { apps: AppList }) => (
    <>
        <AppIconContainer>
            {props.apps.map((app, key) => {
                if (!app.icon) return <div key={key} className="flex-1"></div>;
                else return <AppIcon key={key} alt={app.text} src={app.icon} />;
            })}
        </AppIconContainer>
        <div className="mx-[26px] mt-[2px] p-0 flex flex-row gap-[23px] text-[8pt]">
            {props.apps.map((app, key) => <div className="flex-1 inline" key={key}>{app.text}</div>)}
        </div>
    </>
);

export default AppIconRow;
