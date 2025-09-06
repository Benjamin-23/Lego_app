import { Button } from "@/components/ui/button"
import { Bell, Bot, Globe, Settings, TrendingUp, Users, Zap, Link } from "lucide-react"
export  function NavSideBar(){
    return(
 <div className=" h-[90vh]">
    {/* Sidebar */}
        <aside className="w-64 border-r border-sidebar-border bg-sidebar p-6">
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-3 text-sidebar-foreground">
              <TrendingUp className="h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground"
              onClick={() => (window.location.href = "/domains")}
            >
              <Globe className="h-4 w-4" />
              Domain Monitor
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground"
              onClick={() => (window.location.href = "/doma")}
            >
              <Link className="h-4 w-4" />
              Doma Protocol
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-sidebar-foreground">
              <Bot className="h-4 w-4" />
              Bot Management
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground"
              onClick={() => (window.location.href = "/alerts")}
            >
              <Bell className="h-4 w-4" />
              Alerts
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground"
              onClick={() => (window.location.href = "/subscriptions")}
            >
              <Users className="h-4 w-4" />
              Subscriptions
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground"
              onClick={() => (window.location.href = "/community")}
            >
              <Users className="h-4 w-4" />
              Community
            </Button>
          </nav>
        </aside>
 </div>
 )
}