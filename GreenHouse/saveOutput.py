import requests
import csv
import time

# URL do endpoint para a requisição GET
url = "http://192.168.1.104/soil"

# Nome do arquivo CSV para armazenar os dados
csv_filename = "dados_umidade_solo.csv"

# Função para realizar a requisição e salvar os dados no CSV
def fazer_requisicao_e_armazenar():
    try:
        response = requests.get(url)
        data = response.json()
        umidade = data.get("soilMisture")

        # Obter a hora atual
        hora_atual = time.strftime("%Y-%m-%d %H:%M:%S")

        # Adicionar os dados ao arquivo CSV
        with open(csv_filename, "a", newline="") as csvfile:
            csv_writer = csv.writer(csvfile)
            csv_writer.writerow([hora_atual, umidade])
        
        print(f"Dados registrados: Hora: {hora_atual}, Umidade: {umidade}")
    except Exception as e:
        print("Erro ao fazer a requisição:", e)

# Laço principal para executar a requisição a cada minuto
while True:
    fazer_requisicao_e_armazenar()
    time.sleep(60)  # Esperar 1 minuto
