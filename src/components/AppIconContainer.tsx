function AppIconContainer(props: { children?: any }) {
    return (
        <div className="mx-[26px] mt-[15px] p-0 h-[53px] flex flex-row gap-[23px]">
            {props.children}
        </div>
    );
}

export default AppIconContainer;
