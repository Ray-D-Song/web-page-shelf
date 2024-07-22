interface SideBarProps {
  className: string;
}

function SideBar({ className }: SideBarProps) {
  return (
    <aside className={className}>
      todo
    </aside>
  )
}

export default SideBar
