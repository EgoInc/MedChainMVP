from django.http import HttpResponse


def home(request):
    host = request.get_host()  # Получаем текущий хост
    return HttpResponse(
        f"""
        <h2>Welcome to the MedChainAPI homepage!</h2>
        <h3>This is an API for managing patients' data :)</h3>
        <h3>Feel free to navigate:</h3>
        <ul>
            <li><a href="http://{host}/api/docs/"><b>API Docs</b></a></li>
            <li><a href="http://{host}/admin/">Admin Panel</a></li>
            <li><a href="http://{host}/api/schema/">Schema (download)</a></li>
            <li><a href="http://{host}/api/">API Root (this page)</a></li>
        </ul>
        """
    )
