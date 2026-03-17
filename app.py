from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)
tasks = []

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        task = request.form['task']
        # Remove leading/trailing whitespace
        task = task.strip()
        # Escape the input to prevent XSS
        task = escape(task)
        if task:
            tasks.append(task)
        return redirect(url_for('index'))
    return render_template('index.html', tasks=tasks)

@app.route('/delete/<int:task_id>')
def delete(task_id):
    if 0 <= task_id < len(tasks):
        del tasks[task_id]
    return redirect(url_for('index'))

# Utility function to escape HTML
def escape(text):
    html_escape_table = {
        '&': '&amp;',
        '>': '&gt;',
        '<': '&lt;',
        '"': '&quot;',
        ''': '&#39;',
    }
    return ''.join(html_escape_table.get(c,c) for c in text)

if __name__ == '__main__':
    app.run(debug=True)